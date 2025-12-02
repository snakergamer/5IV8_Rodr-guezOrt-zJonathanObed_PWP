import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import gameRoutes from './routers/gameRouters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend', 'public')));

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend', 'views'));

// Rutas
app.use('/api', gameRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', { title: 'Gato de Gatos' });
});

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📁 Views: ${path.join(__dirname, '../frontend', 'views')}`);
    console.log(`📁 Public: ${path.join(__dirname, '../frontend', 'public')}`);
});