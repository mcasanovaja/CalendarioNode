//8 Para cada usuario la base de datos debe almacenar el correo electrónico que funcionará 
//como el nombre de usuario único ante el sistema, el nombre completo, su contraseña, y su fecha de nacimiento
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

//  select: false en el password significa que en busquedas el password no se va a ver o mostrar
let UserSchema = new Schema({ 
  correo:{ type: String, unique: true, lowercase: true, required: true},
  password:{ type: String, required: true},  
  //password:{ type: String, select: false, required: true},  
  nombres: { type: String, required: true },  
  apellidos: { type: String, required: true},  
  fechaNac: { type: Date, required: true}  
})

UserSchema.pre('save', function(next){	
	console.log('Entramos a pre')
	let user = this	
	//si el usuario no ha modificado el passwor y no es nuevo usuario continua
	if(!user.isModified('password')) return next()
    //si se modifico o es usuario nuevo generamos el salt
	bcrypt.genSalt(10, (err, salt) =>{
		if(err) return next(err)
    //encriptamos el password para guardarlo en la base de datos no se guardara el original
	bcrypt.hash(user.password, salt, (err, hash) =>{	
		if(err) return next(err)
		//sustituimos el password original por el encriptado		
		user.password = hash
		console.log('hasseamos la contraceña')				    
	    next()
	  })		
	})	
})

UserSchema.methods.comparePassword = function(passw, cb){
	bcrypt.compare(passw, this.password, function(err, isMatch){
		console.log('El  password que mandamos es: ' + passw + ' Y el del user es: ' )
		if(err) return cb(err)		
	    cb(null, isMatch)
	})
}

let UserModel = mongoose.model('Usuario', UserSchema)

module.exports = UserModel