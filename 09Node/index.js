var http = require('http');
//vamos a crear nuestro propio servidor
var servidor = http.createServer(function (req, res) {
    //req es una solicitud que viene del cliente servidor, todos los clientes(navegadores, webs apps, servicios, etc) son los que realizan una petición
    //res es la respuesta que el servidor le da al cliente 
    res.writeHead(200, {'Concent-Type': 'text/html; charset = utf-8'});
    response.write('<h1>Hola mundo desde Node.js</h1>');
    response.write('<h1>XDDD</h1>');
    console.log('Hola si ento al servidor');
    res.end();
    
});
//es necesario tener un puerto de comunicación para el servidor
servidor.listen(3000);

console.log('Servidor ejecutandose en http://localhost:3000');