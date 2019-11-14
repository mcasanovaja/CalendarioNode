"use strict";

const Router = require('express').Router();
const funcCtrl = require('../controllers/funciones')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const Users = require('./modelUsuario.js');
const Evento = require('./modelEventos.js');

//Registrarse usuario nuevo
Router.post('/signUp',userCtrl.signUp)//funciona

//iniciar sesion
Router.post('/singIn',userCtrl.singIn)//funciona

// Agregar un nuevo evento
Router.post('/newEvent',funcCtrl.nuevoEvento)

//Obtener todos los usuarios
Router.get('/all', funcCtrl.obtenerTodosUsuarios)//funciona

//Obtener todos los eventos
Router.get('/allEvents', funcCtrl.obtenerTodosEventos)//funciona

//obtener un usuario por id
Router.get('/user/:userId', funcCtrl.obtenerUsuarioById)//funciona

//obtener un evento por su Id
Router.get('/event/:eventById', funcCtrl.obtenerEventosById)//funciona

//borrar un evento por id
Router.get('/deleteEvent/:eventById', funcCtrl.borrarEventosById)

//Obtener todos los eventos de un usuario
Router.get('/allEventsById/:userId', funcCtrl.obtenerEventosByUserId)//funciona

//actualizar la informacion de un evento por el id del evento
Router.post('/updateEvent',funcCtrl.actualizarEventoById)//funciona

//Ruta privada
Router.get('/private', auth, funcCtrl.rutaPrivada)


module.exports = Router