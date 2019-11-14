'use strict'

//const mongoose = require('mongoose')
const User = require('../server/modelUsuario')
const service = require('../services')
const bcrypt = require('bcrypt')
//esta funcion captura todos los campos de body incluyendo el password, antes de guardar encripta el password
//y lo que nos regresa es el token que genera
function signUp(req, res){
  const user = new User({
  	correo: req.body.correo,
  	password: req.body.password,
  	nombres: req.body.nombres,
  	apellidos: req.body.apellidos,
  	fechaNac: req.body.fechaNac  	
  })
  console.log("El correo es: " + user.correo + " El password es " + user.password)
  user.save((err, user) =>{
  	if(err){ return res.status(500).send({ message: `Error al crear el usuario: ${err}`})   
       }else{
         return res.status(201).send({ token: service.createToken(user)})           
       } 
  	
  })
}
//falta la funcion de comparar contraceña
function singIn(req, res){
  let correo = req.body.correo
  let password = req.body.password

  console.log('El correo  en singIn es: ' + req.body.correo + ' Y el password es ' + req.body.password)
   User.findOne({correo}, (err, user) =>{
   	if(err) return res.status(500).send({ message: `Error en el servidor ${err}`}) 
   	if(!user) return res.status(404).send({ mesage:'No existe el usuario'})	
    //si encuentra el correo hay que comparar los paswords
   	/*req.user = user
   	res.status(200).send({
   		message: 'Te has logeado correctamente',
   		token: sevice.createToken(user)
   	})*/
     /*user.comparePassword(req.body.password, function(error, isMatch){
        if(err) return res.status(401).send({ mesage:'Contraceña incorrecta'})
        res.status(200).send({ message: 'Usuario logeado correctamente'})  
        console.log('Password123:' + isMatch)
     })*/

     ////////////////////////////////////////////////////////////////////////
     console.log('El password es ' + password + ' Y el user password es'+ user.password)
      bcrypt.compare(password, user.password, (err, isMatch) =>{
        if(err) return res.status(500).send({message: `Error en el servidor de la contraceña ${err}`});
        if(!isMatch) return res.status(200).send({message: 'PASSWORD INCORRECTA'});
        //res.status(200).send({message: 'Acceso concedido'});
        return res.status(201).send({ token: service.createToken(user),
                                      message: 'Acceso concedido',
                                      usuario: user._id 
                                    })           
      })           

     //////////////////////////////////////////////////////////////////////

   })
}

module.exports = {
	signUp,
	singIn
}