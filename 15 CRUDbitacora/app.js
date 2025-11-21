const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

require('dotenv').config({path: './.env'});

const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



const connection = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

// Rutas
app.get('/', (req, res) => {
    const query = 'SELECT * FROM bitacora_mantenimiento_preventivo ORDER BY fecha_programada DESC';
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error en consulta:', err);
            res.render('index', { registros: [] });
            return;
        }
        res.render('index', { registros: results });
    });
});

app.get('/agregar', (req, res) => {
    res.render('agregar');
});

app.post('/agregar', (req, res) => {
    const { id_equipo, fecha_programada, fecha_ejecucion, tarea_realizada, tecnico_responsable, horas_ciclos, estado_servicio } = req.body;
    
    const query = `INSERT INTO bitacora_mantenimiento_preventivo 
                  (id_equipo, fecha_programada, fecha_ejecucion, tarea_realizada, tecnico_responsable, horas_ciclos, estado_servicio) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    connection.query(query, [id_equipo, fecha_programada, fecha_ejecucion, tarea_realizada, tecnico_responsable, horas_ciclos, estado_servicio], 
    (err, results) => {
        if (err) {
            console.error('Error insertando:', err);
            res.redirect('/agregar?error=1');
            return;
        }
        res.redirect('/?success=1');
    });
});

app.get('/editar/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM bitacora_mantenimiento_preventivo WHERE id = ?';
    
    connection.query(query, [id], (err, results) => {
        if (err || results.length === 0) {
            res.redirect('/');
            return;
        }
        res.render('editar', { registro: results[0] });
    });
});

app.post('/editar/:id', (req, res) => {
    const { id } = req.params;
    const { id_equipo, fecha_programada, fecha_ejecucion, tarea_realizada, tecnico_responsable, horas_ciclos, estado_servicio } = req.body;
    
    const query = `UPDATE bitacora_mantenimiento_preventivo 
                  SET id_equipo=?, fecha_programada=?, fecha_ejecucion=?, tarea_realizada=?, 
                      tecnico_responsable=?, horas_ciclos=?, estado_servicio=?
                  WHERE id=?`;
    
    connection.query(query, [id_equipo, fecha_programada, fecha_ejecucion, tarea_realizada, tecnico_responsable, horas_ciclos, estado_servicio, id], 
    (err, results) => {
        if (err) {
            console.error('Error actualizando:', err);
            res.redirect(`/editar/${id}?error=1`);
            return;
        }
        res.redirect('/?success=2');
    });
});

app.get('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM bitacora_mantenimiento_preventivo WHERE id = ?';
    
    connection.query(query, [id], (err, results) => {
        if (err || results.length === 0) {
            res.redirect('/');
            return;
        }
        res.render('eliminar', { registro: results[0] });
    });
});

app.post('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM bitacora_mantenimiento_preventivo WHERE id = ?';
    
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error eliminando:', err);
            res.redirect(`/eliminar/${id}?error=1`);
            return;
        }
        res.redirect('/?success=3');
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});