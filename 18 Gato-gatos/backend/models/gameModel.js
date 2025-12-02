// models/gameModel.js - VERSIÓN CORREGIDA (Solo 2 jugadores)
import connection from '../config/database.js';

const GameModel = {
    // Guardar resultado de una partida
    saveGameResult: (gameData, callback) => {
        const { player_x, player_o, winner, board_state, duration_seconds, moves_count } = gameData;

        const query = `
            INSERT INTO game_history 
            (player_x, player_o, winner, board_state, duration_seconds, moves_count) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        connection.query(query, [player_x, player_o, winner, board_state, duration_seconds || 0, moves_count || 0], (err, result) => {
            if (err) {
                console.error('Error guardando partida:', err);
                callback(err, null);
                return;
            }

            // Solo actualizar estadísticas para 'Jugador X' y 'Jugador O' (nombres fijos)
            // Los nombres personalizados son solo para mostrar, no se guardan como jugadores separados
            const playerXFixed = 'Jugador X';
            const playerOFixed = 'Jugador O';

            updatePlayerStats(playerXFixed, playerOFixed, winner, (updateErr) => {
                if (updateErr) {
                    console.error('Error actualizando estadísticas:', updateErr);
                }
                callback(null, {
                    id: result.insertId,
                    message: 'Partida guardada exitosamente',
                    player_x_display: player_x,
                    player_o_display: player_o
                });
            });
        });
    },

    // Obtener historial de partidas
    getGameHistory: (limit = 10, callback) => {
        const query = `
            SELECT * FROM game_history 
            ORDER BY game_date DESC 
            LIMIT ?
        `;

        connection.query(query, [limit], (err, results) => {
            callback(err, results);
        });
    },

    // Alias para getGameHistory
    getRecentGames: (limit, callback) => {
        GameModel.getGameHistory(limit, callback);
    },

    // Obtener estadísticas generales
    getGameStats: (callback) => {
        const query = `
            SELECT 
                COUNT(*) as total_games,
                SUM(CASE WHEN winner = 'X' THEN 1 ELSE 0 END) as x_wins,
                SUM(CASE WHEN winner = 'O' THEN 1 ELSE 0 END) as o_wins,
                SUM(CASE WHEN winner = 'Draw' THEN 1 ELSE 0 END) as draws
            FROM game_history
        `;

        connection.query(query, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results[0]);
        });
    },

    // Obtener puntajes de jugadores (SOLO 2 jugadores fijos)
    getPlayerScores: (callback) => {
        const query = `
            SELECT player_name, wins, losses, draws, total_score 
            FROM players 
            WHERE player_name IN ('Jugador X', 'Jugador O')
            ORDER BY player_name
        `;

        connection.query(query, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }

            // Si no existen los jugadores fijos, crearlos
            if (results.length === 0) {
                createDefaultPlayers(callback);
            } else {
                // Asegurarse de que haya exactamente 2 jugadores
                const defaultPlayers = [
                    { player_name: 'Jugador X', wins: 0, losses: 0, draws: 0, total_score: 0 },
                    { player_name: 'Jugador O', wins: 0, losses: 0, draws: 0, total_score: 0 }
                ];

                // Combinar con resultados existentes
                defaultPlayers.forEach(defaultPlayer => {
                    const existing = results.find(r => r.player_name === defaultPlayer.player_name);
                    if (!existing) {
                        results.push(defaultPlayer);
                    }
                });

                callback(null, results.slice(0, 2)); // Solo devolver 2 jugadores
            }
        });
    },

    // Actualizar jugador (solo actualiza nombres de visualización, no crea nuevos)
    updatePlayerDisplayName: (playerType, displayName, callback) => {
        // En esta versión, no guardamos nombres personalizados en la BD
        // Solo devolvemos éxito para mantener la compatibilidad
        callback(null, { success: true, message: 'Nombre actualizado (solo visual)' });
    }
};

// Crear jugadores por defecto si no existen
function createDefaultPlayers(callback) {
    const players = [
        { player_name: 'Jugador X', wins: 0, losses: 0, draws: 0, total_score: 0 },
        { player_name: 'Jugador O', wins: 0, losses: 0, draws: 0, total_score: 0 }
    ];

    const insertPromises = players.map(player => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO players (player_name, wins, losses, draws, total_score) 
                VALUES (?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE player_name = VALUES(player_name)
            `;

            connection.query(query, [
                player.player_name,
                player.wins,
                player.losses,
                player.draws,
                player.total_score
            ], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    });

    Promise.all(insertPromises)
        .then(() => {
            callback(null, players);
        })
        .catch(err => {
            console.error('Error creando jugadores por defecto:', err);
            callback(err, null);
        });
}

// Función auxiliar para actualizar estadísticas
function updatePlayerStats(playerX, playerO, winner, callback) {
    // Actualizar jugador X
    updatePlayerStat(playerX, winner === 'X' ? 'win' : winner === 'O' ? 'loss' : 'draw');

    // Actualizar jugador O
    updatePlayerStat(playerO, winner === 'O' ? 'win' : winner === 'X' ? 'loss' : 'draw');

    callback(null);
}

function updatePlayerStat(playerName, result) {
    let updateField = '';
    let scoreIncrement = 0;

    switch (result) {
        case 'win':
            updateField = 'wins = wins + 1';
            scoreIncrement = 3;
            break;
        case 'loss':
            updateField = 'losses = losses + 1';
            scoreIncrement = 0;
            break;
        case 'draw':
            updateField = 'draws = draws + 1';
            scoreIncrement = 1;
            break;
    }

    const query = `
        UPDATE players 
        SET ${updateField}, total_score = total_score + ? 
        WHERE player_name = ?
    `;

    connection.query(query, [scoreIncrement, playerName], (err) => {
        if (err) console.error(`Error actualizando ${playerName}:`, err);
    });
}

export default GameModel;