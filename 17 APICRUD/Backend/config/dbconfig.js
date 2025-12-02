import mysql from 'mysql2';
import dotenv from 'dotenv';

//si vamos a tener una base de datos necesitamos
//import (fileemTodmf eir0)
//const _filename = fileURLToPath(import.meta.url);
//const _dirname = path.dirname(_filename);
dotenv.config();

const config = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'n0m3l0',
    database : 'curso'
    
    //connectionLimit : 10,
    //arquiretimeout : 30000,
    //lidletimeout : 30000,
});

config.getConnection((err) => {
    if(err) {
        console.log('Error de conexion a la base de datos', err);
        return;
    } else {
        console.log('Conexion exitosa a la base de datos');
    }
    connection.release();
});

export default config;