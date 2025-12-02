import GameModel from '../models/gameModel.js';

const GameController = {
    // Guardar una partida
    saveGame: (req, res) => {
        const gameData = req.body;

        if (!gameData.player_x || !gameData.player_o) {
            return res.status(400).json({
                success: false,
                message: 'Se requieren los nombres de ambos jugadores'
            });
        }

        GameModel.saveGameResult(gameData, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al guardar la partida',
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: 'Partida guardada exitosamente',
                data: result
            });
        });
    },

    // Obtener últimas partidas (para mostrar en tabla)
    getRecentGames: (req, res) => {
        const limit = parseInt(req.query.limit) || 10;

        GameModel.getRecentGames(limit, (err, games) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al obtener las partidas recientes',
                    error: err.message
                });
            }

            // También obtener estadísticas generales
            GameModel.getGameStats((statsErr, stats) => {
                if (statsErr) {
                    console.error('Error obteniendo estadísticas:', statsErr);
                }

                res.json({
                    success: true,
                    data: {
                        recent_games: games,
                        stats: stats
                    }
                });
            });
        });
    },

    // Endpoint para compatibilidad (redirige a getRecentGames)
    getScores: (req, res) => {
        return GameController.getRecentGames(req, res);
    },

    // Endpoint para compatibilidad (nombres temporales)
    updatePlayer: (req, res) => {
        const { player_name } = req.body;

        res.json({
            success: true,
            message: 'Nombre actualizado (solo visual)',
            data: { player_name }
        });
    }
};

export default GameController;