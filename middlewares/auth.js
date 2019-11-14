'use strict'

const services = require('../services')

function isAuth(req, res, next){
  //EL HEADERS DEVE TENER UNA CABECERA LLAMADA authorization  Y SU VALOR DEBE DE SER Bearer ESPACIO Y EL TOKEN
	if(!req.headers.authorization){
		return res.status(403).send({message: 'No tiene autorización'})
	}

	const token = req.headers.authorization.split(" ")[1]
	console.log("El token de auth es " + token)
    services.decodeToken(token)
       .then(response =>{
       	  req.user = response
       	  next()
       })
       .catch(response => {
       	  res.status(response.status)
       })
}


module.exports = isAuth










