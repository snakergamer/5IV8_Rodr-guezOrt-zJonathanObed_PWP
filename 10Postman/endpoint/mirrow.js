const mirrow = (req, res) => {
    const methods = [{
        method: 'POST',
        hasBody: true,
        purpouse: "El metodo post se usa para enviar un recurso especifico causando un cambio en el estado o algunos efectos sevcundarios en el servidor."
    },
    {
        method: 'PATCH',
        hasBody: true,
        purpouse: "El metodo PATCH es aplicado para aplicar modificaciones parciales a un recurso especifico."
    },
    {
        method: 'PUT',
        hasBody: true,
        purpouse: "El metodo put se usa para actualizar un recurso especifico o crear uno nuevo si no existe."
    },
    {
        method: 'HEAD',
        hasBody: false,
        purpouse: "El metodo HEAD pide una respuesta identica a la de una petición GET pero sin el cuerpo de la respuesta."
    },{
        method: 'GET',
        hasBody: false,
        purpouse: "El metodo GET se usa para solicitar datos de un recurso especifico las peticiones que usan el metodo solo deben recuperar datos sin modificarlo."
    },{
        method: 'DELETE',
        hasBody: false,
        purpouse: "El metodo DELETE se usa para eliminar un recurso especifico."
    }];

    const requestMethod = methods.find(m => m.method === req.method) || {
        method: req.method,
        hasBody: false,
        purpouse: "No tiene body, no tiene una respuesta, metodo no soportado"
    };
    requestMethod.purpouse += req.method === 'GET' ? " La informacion solicitada se encuentra en el query" : req.Method.hasBody ? "Tiene cuerpo" : " No tiene cuerpo";
    if(requestMethod.hasBody) {
        req.body; //js debe de parsear mediante un json el objeto necesario
        res.json({...request.body, ruta_consumida:
            req.route.path, ...requestMethod});
        } else {
            res.json({ruta_consumida: req.originalUrl, ...requestMethod});
        }
};
module.exports = mirrow;
