'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../server/config')
//esta funcion crea el token con el _id del user para generar el payload y con el secret token generar el token
function createToken (user){
	const payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix()
	}

	return jwt.encode(payload, config.SECRET_TOKEN)

}

//esta funcion lo que hace es con el token que se mando en la cabecera decodificarlo en el payload y el secret token 
//para sacar el user._id
function decodeToken(token){
	const decoded = new Promise((resolve, reject) => {
		try{
		  const payload = jwt.decode(token, config.SECRET_TOKEN)	

		  if(payload.exp <= moment().unix()){
		  	reject({
		  		status: 401,
		  		message: 'El token ha expirado'
		  	})
		  }
		  resolve( payload.sub )
		}catch(err){
           reject({
           	status: 500,
           	message: 'Invalid Token'
           })
		}
	})

	return decoded
}


module.exports = {
	createToken,
    decodeToken
   }




















