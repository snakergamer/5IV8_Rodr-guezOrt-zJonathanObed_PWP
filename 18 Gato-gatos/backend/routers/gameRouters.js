// routes/gameRoutes.js
import express from 'express';
import GameController from '../controllers/gameController.js';

const router = express.Router();

// Rutas de la API
router.post('/save-game', GameController.saveGame);
router.get('/recent-games', GameController.getRecentGames); // Nuevo endpoint
router.get('/scores', GameController.getScores); // Para compatibilidad
router.post('/update-player', GameController.updatePlayer);

// Ruta de prueba
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'API de Gato de Gatos funcionando',
        endpoints: [
            'POST /api/save-game',
            'GET /api/recent-games?limit=10',
            'GET /api/scores',
            'POST /api/update-player'
        ]
    });
});

export default router;