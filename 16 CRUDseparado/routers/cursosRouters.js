//este es el middleware

const { Router } = require('express');

//definir la ruta del consumo del endpoint

const cursosController = require('../Controllers/cursosControl.js');

const cursosRouter = Router();

//definir cada endpoint

cursosRouter.get('/', cursosController.getCursos);

cursosRouter.get('/:id', cursosController.getCursoById);

//post
cursosRouter.post('/registrar-curso', cursosController.createCurso);

//put
cursosRouter.put('/:id', cursosController.updateCurso);

//delete
cursosRouter.delete('/:id', cursosController.deleteCurso);