// public/js/game.js - VERSIÓN FINAL COMPLETA
document.addEventListener('DOMContentLoaded', function () {
    // Variables del juego
    let gameState = {
        megaBoard: Array(9).fill(null).map(() => Array(9).fill(null)),
        currentPlayer: 'X',
        activeBoard: null,
        gameActive: true,
        scores: { X: 0, O: 0 },
        playerNames: { X: 'Jugador X', O: 'Jugador O' },
        boardWinners: Array(9).fill(null), // null = libre, 'X'/'O' = ganado, 'D' = empate
        gameStartTime: null,
        gameHistory: [],
        movesCount: 0,
        currentSmallGame: null, // {boardIndex: número, cells: Array(9), currentPlayer: 'X'/'O'}
        smallGameActive: false
    };

    // Elementos del DOM
    const megaBoardElement = document.getElementById('mega-board');
    const currentTurnElement = document.getElementById('current-turn');
    const gameStatusElement = document.getElementById('game-status');
    const scoreXElement = document.getElementById('score-x');
    const scoreOElement = document.getElementById('score-o');
    const playerXNameElement = document.getElementById('player-x-name');
    const playerONameElement = document.getElementById('player-o-name');
    const playerXInput = document.getElementById('player-x-input');
    const playerOInput = document.getElementById('player-o-input');
    const newGameBtn = document.getElementById('new-game');
    const resetScoresBtn = document.getElementById('reset-scores');
    const saveGameBtn = document.getElementById('save-game');
    const updateNamesBtn = document.getElementById('update-names');
    const resetNamesBtn = document.getElementById('reset-names');
    const scoresTableBody = document.getElementById('scores-table-body');
    const winnerModal = document.getElementById('winner-modal');
    const winnerTitle = document.getElementById('winner-title');
    const winnerIcon = document.getElementById('winner-icon');
    const winnerMessage = document.getElementById('winner-message');
    const playAgainBtn = document.getElementById('play-again');
    const closeModalBtn = document.querySelector('.close-modal');

    // Inicializar el juego
    initGame();
    loadRecentGames();

    // Inicializar el tablero
    function initGame() {
        gameState = {
            megaBoard: Array(9).fill(null).map(() => Array(9).fill(null)),
            currentPlayer: 'X',
            activeBoard: null,
            gameActive: true,
            scores: { X: 0, O: 0 },
            playerNames: { X: 'Jugador X', O: 'Jugador O' },
            boardWinners: Array(9).fill(null),
            gameStartTime: new Date(),
            gameHistory: [],
            movesCount: 0,
            currentSmallGame: null,
            smallGameActive: false
        };

        renderMegaBoard();
        updateUI();
    }

    // Renderizar el mega tablero
    function renderMegaBoard() {
        megaBoardElement.innerHTML = '';

        for (let boardIndex = 0; boardIndex < 9; boardIndex++) {
            const smallBoard = document.createElement('div');
            smallBoard.className = 'small-board';
            smallBoard.dataset.boardIndex = boardIndex;

            // Verificar si el tablero está ganado o en empate
            const boardStatus = gameState.boardWinners[boardIndex];

            if (boardStatus) {
                smallBoard.classList.add('won');
                const winner = document.createElement('div');
                winner.className = 'board-winner';

                if (boardStatus === 'D') {
                    winner.textContent = '='; // Símbolo de empate
                    winner.style.color = '#888';
                } else {
                    winner.textContent = boardStatus;
                    winner.style.color = boardStatus === 'X' ? '#ff5757' : '#5792ff';
                }

                winner.style.fontSize = '4rem';
                winner.style.display = 'flex';
                winner.style.alignItems = 'center';
                winner.style.justifyContent = 'center';
                winner.style.height = '100%';
                smallBoard.appendChild(winner);
                megaBoardElement.appendChild(smallBoard);
                continue;
            }

            // Marcar tablero como seleccionable (si no hay juego activo)
            if (!gameState.smallGameActive && gameState.activeBoard === null) {
                smallBoard.classList.add('selectable');
                smallBoard.style.cursor = 'pointer';
            } else if (gameState.currentSmallGame && gameState.currentSmallGame.boardIndex === boardIndex) {
                smallBoard.classList.add('active');
            }

            // Mostrar el estado actual del tablero pequeño
            for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.boardIndex = boardIndex;
                cell.dataset.cellIndex = cellIndex;

                // Establecer contenido de la celda
                const cellValue = gameState.megaBoard[boardIndex][cellIndex];
                if (cellValue) {
                    cell.textContent = cellValue;
                    cell.classList.add(cellValue.toLowerCase());
                }

                // Si hay un juego pequeño activo en este tablero
                if (gameState.currentSmallGame &&
                    gameState.currentSmallGame.boardIndex === boardIndex &&
                    gameState.smallGameActive &&
                    !cellValue) {
                    cell.addEventListener('click', () => handleSmallGameClick(boardIndex, cellIndex));
                    cell.classList.add('small-game-active');
                }
                // Si no hay juego activo y este tablero se puede seleccionar
                else if (!gameState.smallGameActive && gameState.activeBoard === null && !boardStatus) {
                    cell.addEventListener('click', () => startSmallGame(boardIndex));
                    cell.style.cursor = 'pointer';
                } else {
                    cell.style.cursor = 'not-allowed';
                }

                smallBoard.appendChild(cell);
            }

            megaBoardElement.appendChild(smallBoard);
        }
    }

    // Iniciar un juego pequeño en un tablero específico
    function startSmallGame(boardIndex) {
        if (gameState.boardWinners[boardIndex] || gameState.smallGameActive) {
            return;
        }

        gameState.currentSmallGame = {
            boardIndex: boardIndex,
            cells: [...gameState.megaBoard[boardIndex]], // Copia del estado actual
            currentPlayer: gameState.currentPlayer
        };

        gameState.smallGameActive = true;
        gameState.activeBoard = boardIndex;

        // Actualizar UI
        renderMegaBoard();
        updateUI();

        gameStatusElement.textContent = `Jugando en tablero ${boardIndex + 1}`;
    }

    // Manejar clic en el juego pequeño
    function handleSmallGameClick(boardIndex, cellIndex) {
        if (!gameState.smallGameActive ||
            !gameState.currentSmallGame ||
            gameState.currentSmallGame.boardIndex !== boardIndex ||
            gameState.megaBoard[boardIndex][cellIndex]) {
            return;
        }

        // Realizar movimiento en el juego pequeño
        gameState.megaBoard[boardIndex][cellIndex] = gameState.currentSmallGame.currentPlayer;
        gameState.movesCount++;

        // Verificar si hay ganador en el juego pequeño
        const smallBoardWinner = checkWinner(gameState.megaBoard[boardIndex]);

        if (smallBoardWinner) {
            // Hay ganador en el juego pequeño
            gameState.boardWinners[boardIndex] = smallBoardWinner;
            gameState.scores[smallBoardWinner]++;
            endSmallGame(smallBoardWinner);
        } else if (isBoardFull(gameState.megaBoard[boardIndex])) {
            // Empate en el juego pequeño
            const winner = decideDrawWinner(); // 50/50 de probabilidad
            gameState.boardWinners[boardIndex] = winner;
            gameState.scores[winner]++;
            endSmallGame(winner);
        } else {
            // Continuar el juego pequeño
            gameState.currentSmallGame.currentPlayer = gameState.currentSmallGame.currentPlayer === 'X' ? 'O' : 'X';

            // Actualizar solo el tablero pequeño
            renderMegaBoard();
            updateUI();
            return;
        }

        // Si llegamos aquí, el juego pequeño terminó.
        // Primero actualizamos la UI para mostrar el tablero ganado (X o O grande)
        renderMegaBoard();
        updateUI();

        // Verificar si hay ganador en el mega tablero
        const megaBoardWinner = checkMegaWinner();
        if (megaBoardWinner) {
            gameState.gameActive = false;
            // Usar setTimeout para permitir que la UI se actualice antes de mostrar el modal
            setTimeout(() => {
                showWinner(megaBoardWinner);
            }, 500);
        } else if (isMegaBoardFull()) {
            gameState.gameActive = false;
            setTimeout(() => {
                showDraw();
            }, 500);
        } else {
            // Preparar para nuevo juego pequeño
            gameState.currentPlayer = gameState.currentSmallGame.currentPlayer;
            gameState.currentSmallGame = null;
            gameState.smallGameActive = false;
            gameState.activeBoard = null;

            // Actualizar UI nuevamente para mostrar opciones de selección
            renderMegaBoard();
            updateUI();
        }
    }

    // Decidir ganador en caso de empate (50/50 probabilidad)
    function decideDrawWinner() {
        return Math.random() < 0.5 ? 'X' : 'O';
    }

    // Finalizar juego pequeño
    function endSmallGame(winner) {
        console.log(`Juego pequeño terminado. Ganador: ${winner}`);

        // Guardar historial del juego pequeño
        gameState.gameHistory.push({
            boardIndex: gameState.currentSmallGame.boardIndex,
            winner: winner,
            moves: gameState.megaBoard[gameState.currentSmallGame.boardIndex].filter(cell => cell !== null).length,
            timestamp: new Date().toISOString()
        });
    }

    // Verificar si hay un ganador en un tablero
    function checkWinner(board) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
            [0, 4, 8], [2, 4, 6]             // Diagonales
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return null;
    }

    // Verificar ganador del mega tablero
    function checkMegaWinner() {
        const board = gameState.boardWinners;
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
            [0, 4, 8], [2, 4, 6]             // Diagonales
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] !== 'D' &&
                board[a] === board[b] &&
                board[a] === board[c]) {
                return board[a];
            }
        }

        return null;
    }

    // Verificar si un tablero está lleno
    function isBoardFull(board) {
        return board.every(cell => cell !== null);
    }

    // Verificar si el mega tablero está lleno
    function isMegaBoardFull() {
        return gameState.boardWinners.every(status => status !== null);
    }

    // Calcular duración del juego
    function getGameDuration() {
        if (!gameState.gameStartTime) return 0;
        const endTime = new Date();
        return Math.floor((endTime - gameState.gameStartTime) / 1000);
    }

    // Actualizar la interfaz de usuario
    function updateUI() {
        // Mostrar contador de movimientos
        document.getElementById('moves-count').textContent = `Movimientos: ${gameState.movesCount}/81`;

        // Actualizar turno actual
        let currentPlayerSymbol = '❌';
        if (gameState.smallGameActive && gameState.currentSmallGame) {
            currentPlayerSymbol = gameState.currentSmallGame.currentPlayer === 'X' ? '❌' : '⭕';
        } else {
            currentPlayerSymbol = gameState.currentPlayer === 'X' ? '❌' : '⭕';
        }

        currentTurnElement.textContent = currentPlayerSymbol;
        currentTurnElement.style.color = currentPlayerSymbol === '❌' ? '#ff5757' : '#5792ff';

        // Actualizar estado del juego
        if (!gameState.gameActive) {
            gameStatusElement.textContent = 'Juego Terminado';
            gameStatusElement.style.color = '#ff9a3c';
        } else if (gameState.smallGameActive && gameState.currentSmallGame) {
            gameStatusElement.textContent = `Jugando en tablero ${gameState.currentSmallGame.boardIndex + 1} (Turno: ${gameState.currentSmallGame.currentPlayer})`;
            gameStatusElement.style.color = '#4a00e0';
        } else {
            gameStatusElement.textContent = 'Selecciona un tablero para jugar';
            gameStatusElement.style.color = '#2ecc71';
        }

        // Actualizar puntajes
        scoreXElement.textContent = gameState.scores.X;
        scoreOElement.textContent = gameState.scores.O;

        // Actualizar nombres de jugadores
        playerXNameElement.textContent = gameState.playerNames.X;
        playerONameElement.textContent = gameState.playerNames.O;

        // Actualizar panel de información
        updateInfoPanel();
    }

    // Actualizar panel de información
    function updateInfoPanel() {
        const boardsX = gameState.boardWinners.filter(b => b === 'X').length;
        const boardsO = gameState.boardWinners.filter(b => b === 'O').length;

        document.getElementById('boards-x').textContent = boardsX;
        document.getElementById('boards-o').textContent = boardsO;

        const gamePhaseElement = document.getElementById('game-phase');
        if (gameState.smallGameActive) {
            gamePhaseElement.textContent = `Juego pequeño activo`;
            gamePhaseElement.style.color = '#4a00e0';
        } else if (gameState.activeBoard === null) {
            gamePhaseElement.textContent = 'Seleccionando tablero';
            gamePhaseElement.style.color = '#2ecc71';
        } else {
            gamePhaseElement.textContent = 'Esperando...';
            gamePhaseElement.style.color = '#666';
        }
    }

    // Mostrar ganador
    function showWinner(winner) {
        winnerIcon.textContent = winner === 'X' ? '❌' : '⭕';
        winnerIcon.style.color = winner === 'X' ? '#ff5757' : '#5792ff';
        winnerTitle.textContent = '¡Tenemos un ganador!';
        winnerMessage.textContent = `${gameState.playerNames[winner]} ha ganado el juego.`;
        winnerModal.style.display = 'flex';

        // Guardar resultado en la base de datos
        saveGameToAPI(winner);
    }

    // Mostrar empate
    function showDraw() {
        winnerIcon.textContent = '🤝';
        winnerIcon.style.color = '#4a00e0';
        winnerTitle.textContent = '¡Empate!';
        winnerMessage.textContent = 'El juego ha terminado en empate.';
        winnerModal.style.display = 'flex';

        // Guardar resultado en la base de datos
        saveGameToAPI('Draw');
    }

    // Cargar partidas recientes
    function loadRecentGames() {
        // Primero intentar con el nuevo endpoint
        fetch('/api/recent-games?limit=10')
            .then(response => {
                if (!response.ok) {
                    // Si falla, intentar con el endpoint antiguo
                    return fetch('/api/scores?limit=10');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Verificar si es el formato nuevo o antiguo
                    if (data.data && data.data.recent_games) {
                        // Formato nuevo
                        updateRecentGamesTable(data.data.recent_games);
                        if (data.data.stats) {
                            updateGameStats(data.data.stats);
                        }
                    } else if (Array.isArray(data.data)) {
                        // Formato antiguo (array directo)
                        updateRecentGamesTable(data.data);
                    } else {
                        // Datos inválidos, mostrar demo
                        showDemoGames();
                    }
                } else {
                    console.error('Error al cargar partidas:', data.message);
                    showDemoGames();
                }
            })
            .catch(error => {
                console.error('Error de conexión:', error);
                showDemoGames();
            });
    }

    // Actualizar tabla de últimas partidas
    function updateRecentGamesTable(games) {
        if (!scoresTableBody) return;

        scoresTableBody.innerHTML = '';

        if (!games || games.length === 0) {
            scoresTableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: #888; padding: 20px;">
                        No hay partidas recientes. ¡Juega la primera!
                    </td>
                </tr>
            `;
            return;
        }

        games.forEach((game, index) => {
            const row = document.createElement('tr');

            // Formatear fecha
            let formattedDate = 'N/A';
            if (game.game_date) {
                const date = new Date(game.game_date);
                formattedDate = date.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }

            // Formatear duración
            const duration = game.duration_seconds || 0;
            const minutes = Math.floor(duration / 60);
            const seconds = duration % 60;
            const durationText = minutes > 0 ?
                `${minutes}m ${seconds}s` :
                `${seconds}s`;

            // Determinar resultado
            let resultText = '';
            let resultClass = '';

            if (game.winner === 'X') {
                resultText = `Ganó ${game.player_x || 'Jugador X'}`;
                resultClass = 'result-win-x';
            } else if (game.winner === 'O') {
                resultText = `Ganó ${game.player_o || 'Jugador O'}`;
                resultClass = 'result-win-o';
            } else if (game.winner === 'Draw') {
                resultText = 'Empate';
                resultClass = 'result-draw';
            } else {
                resultText = 'En progreso';
                resultClass = 'result-in-progress';
            }

            row.innerHTML = `
                <td>${index + 1}</td>
                <td><strong>${game.player_x || 'Jugador X'}</strong> vs <strong>${game.player_o || 'Jugador O'}</strong></td>
                <td class="${resultClass}">${resultText}</td>
                <td>${formattedDate}</td>
                <td>${durationText} (${game.moves_count || 0} mov.)</td>
            `;

            scoresTableBody.appendChild(row);
        });
    }

    // Mostrar estadísticas del juego
    function updateGameStats(stats) {
        const statsElement = document.getElementById('game-stats');
        if (statsElement && stats) {
            statsElement.innerHTML = `
                <div class="stat-item">
                    <div class="stat-value" style="color: #ff5757;">${stats.x_wins || 0}</div>
                    <div class="stat-label">Victorias X</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" style="color: #5792ff;">${stats.o_wins || 0}</div>
                    <div class="stat-label">Victorias O</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" style="color: #888;">${stats.draws || 0}</div>
                    <div class="stat-label">Empates</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" style="color: #4a00e0;">${stats.total_games || 0}</div>
                    <div class="stat-label">Total Partidas</div>
                </div>
            `;
        }
    }

    // Datos de demostración
    function showDemoGames() {
        const demoGames = [
            {
                player_x: 'Jugador X',
                player_o: 'Jugador O',
                winner: 'X',
                game_date: new Date().toISOString(),
                duration_seconds: 120,
                moves_count: 25
            },
            {
                player_x: 'Ana',
                player_o: 'Carlos',
                winner: 'O',
                game_date: new Date(Date.now() - 86400000).toISOString(),
                duration_seconds: 180,
                moves_count: 32
            },
            {
                player_x: 'Jugador X',
                player_o: 'CPU',
                winner: 'Draw',
                game_date: new Date(Date.now() - 172800000).toISOString(),
                duration_seconds: 150,
                moves_count: 28
            }
        ];

        updateRecentGamesTable(demoGames);

        // Estadísticas de demo
        updateGameStats({
            total_games: 3,
            x_wins: 1,
            o_wins: 1,
            draws: 1,
            total_duration: 450
        });
    }

    // Guardar juego en la API
    function saveGameToAPI(winner) {
        const gameData = {
            player_x: gameState.playerNames.X,
            player_o: gameState.playerNames.O,
            winner: winner,
            board_state: JSON.stringify(gameState.megaBoard),
            duration_seconds: getGameDuration(),
            moves_count: gameState.movesCount
        };

        fetch('/api/save-game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData)
        })
            .then(response => {
                if (!response.ok) throw new Error('Error en la respuesta de la API');
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    console.log('Partida guardada exitosamente');
                    // Recargar el historial después de guardar
                    setTimeout(() => {
                        loadRecentGames();
                    }, 500);
                } else {
                    console.error('Error al guardar partida:', data.message);
                }
            })
            .catch(error => {
                console.error('Error de conexión:', error);
            });
    }

    // Event Listeners
    newGameBtn.addEventListener('click', function () {
        initGame();
        winnerModal.style.display = 'none';
    });

    resetScoresBtn.addEventListener('click', function () {
        if (confirm('¿Estás seguro de que quieres reiniciar la partida actual? Se perderá el progreso.')) {
            initGame();
        }
    });

    saveGameBtn.addEventListener('click', function () {
        if (!gameState.gameActive) {
            alert('El juego ya ha terminado. Inicia un nuevo juego para guardar.');
            return;
        }

        const gameData = {
            player_x: gameState.playerNames.X,
            player_o: gameState.playerNames.O,
            winner: 'InProgress',
            board_state: JSON.stringify(gameState.megaBoard),
            duration_seconds: getGameDuration(),
            moves_count: gameState.movesCount
        };

        fetch('/api/save-game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Partida guardada en el historial');
                    loadRecentGames();
                } else {
                    alert('Error al guardar la partida: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error de conexión al guardar la partida');
            });
    });

    updateNamesBtn.addEventListener('click', function () {
        const newNameX = playerXInput.value.trim();
        const newNameO = playerOInput.value.trim();

        if (newNameX) {
            gameState.playerNames.X = newNameX;
        }
        if (newNameO) {
            gameState.playerNames.O = newNameO;
        }

        if (!newNameX && !newNameO) {
            alert('Por favor ingresa al menos un nombre');
            return;
        }

        updateUI();

        alert('Nombres actualizados correctamente (solo para esta sesión)');

        // Limpiar los inputs después de actualizar
        playerXInput.value = '';
        playerOInput.value = '';
    });

    resetNamesBtn.addEventListener('click', function () {
        gameState.playerNames.X = 'Jugador X';
        gameState.playerNames.O = 'Jugador O';

        playerXInput.value = '';
        playerOInput.value = '';

        updateUI();
        alert('Nombres restaurados a los valores originales');
    });

    playAgainBtn.addEventListener('click', function () {
        initGame();
        winnerModal.style.display = 'none';
    });

    closeModalBtn.addEventListener('click', function () {
        winnerModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === winnerModal) {
            winnerModal.style.display = 'none';
        }
    });

    // Inicializar inputs vacíos
    playerXInput.value = '';
    playerOInput.value = '';
});