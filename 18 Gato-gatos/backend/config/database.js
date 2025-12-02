import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const config = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'obed2008',
    database: 'gato_gatos'
});

config.getConnection((err, connection) => {
    if (err) {
        console.log('Error de conexion a la base de datos', err);
        return;
    } else {
        console.log('Conexion exitosa a la base de datos');
        connection.release();
    }
});

export default config;