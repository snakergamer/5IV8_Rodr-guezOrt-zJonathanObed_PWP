import express from 'express';
import path from 'path';
import productRoutes from './routes/productrouters.js';
//aqui nosotros tenemos que agregar las rutas que se van a consumir

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend' , 'public')));

app.set('views', 'ejs');
app.set('public' , path.join(__dirname, '../frontend' , 'public'));
//vamos a consumir las rutas
app.use('/api', productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});