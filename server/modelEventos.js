//Cada evento comprende un id, título, fecha de inicio, hora de inicio, fecha de finalización, hora de finalización
// (los últimos 3 pueden ser nulos), y un campo booleano que indique si el evento es de día completo o no.
const mongoose = require('mongoose')
const Usuario = require('./modelUsuario.js')
//var Autor = mongoose.model('Autor');

const Schema = mongoose.Schema

let UserSchema = new Schema({ 
  nombre : { type: String, required: true },
  start : { type: Date, required: true },
  title : { type: String, required: true },
  end : { type: String, required: false, default: '' },
  start_hour : { type: String, required: false, default: '' },
  end_hour : { type: String, required: false, default: '' },
  usuario : { type: Schema.ObjectId, ref: "Usuario" }  

  /*titulo:{ type: String, required: true},
  fechaIni: { type: Date, required: true},  
  fechaFin: { type: Date, required: false, default: ''},
  horaIni: { type: String, required: false, default: ''},
  horaFin: { type: String, required: false, default: ''},
  usuario: { type: Schema.ObjectId, ref: "Usuario" }  
  end: { type: String, required: false, default: '' },/*

  /*nombre : { type: String, required: true },
    start : { type: Date, required: true },
    title : { type: String, required: true },
    end : { type: String, required: false, default: '' },
    start_hour : { type: String, required: false, default: '' },
    end_hour : { type: String, required: false, default: '' },*/ 
})

let UserModel = mongoose.model('Evento', UserSchema)

module.exports = UserModel