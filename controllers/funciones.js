"use strict";

const Router = require('express').Router();
const Users = require('../server/modelUsuario');
const Evento = require('../server/modelEventos');

//function crearUsuario

function obtenerTodosUsuarios(req, res){
  Users.find({},(err, usuarios)=>{
        if(err){
            res.status(500).send(`Error al realizar la peticion a la base de datos: ${err}`);                       
        }else if(!usuarios){
            res.status(404).send(`Error no hay usuarios en la base de datos: ${err}`);                   
        }else{
            res.status(200).send(usuarios);             
        } 
     }); 
}

function obtenerUsuarioById(req, res){
    let id = req.params.userId;
    //console.log('El usuario es: ' + id)
    //console.log(req.params)
    Users.findById(id,(err, user)=>{
        if (err){                    
                   res.status(500).send({message:`Error al realizar la peticion a la base de datos: ${err}`});           
        }else if(!user){
            res.status(404).send({message:`Error no se localizo el usuario en la base de datos: ${err}`});       
        }else{
            res.status(200).send({user}); 
        }
    });
}

function obtenerEventosById(req, res){
   let id = req.params.eventById;
   Evento.findById(id,(err, event)=>{
        if (err){                    
                   res.status(500).send({message:`Error al realizar la peticion a la base de datos: ${err}`});           
        }else if(!event){
            res.status(404).send({message:`Error no se localizo el evento en la base de datos: ${err}`});       
        }else{
            res.status(200).send({event}); 
        }
    });
}

function obtenerTodosEventos(req, res){
	Evento.find({},(err, eVentos)=>{
     	Users.populate(eVentos, {path: "usuario"},function(err, eVentos){
        	if(err){
            res.status(500).send(`Error al realizar la peticion a la base de datos: ${err}`);                       
	        }else if(!eVentos){
	            res.status(404).send(`Error no hay eventos en la base de datos: ${err}`);                   
	        }else{
	            res.status(200).send(eVentos);             
	        } 
        });
        
     });    
}

function obtenerEventosByUserId(req, res){
        //capturo el id del usuario
        let id = req.params.userId;
        //lo busco
        Users.findById(id,(err, user)=>{
        if (err){                    
            res.status(500).send({message:`Error al realizar la peticion a la base de datos: ${err}`});           
        }else if(!user){
            res.status(404).send({message:`Error no se localizo el usuario en la base de datos: ${err}`});       
        }else{
            //res.status(200).send({user}); 
            //aqui busco los eventos del usuario
            Evento.find({usuario: user._id}, (err, eVentos)=>{       
                if(err){
                res.status(500).send(`Error al realizar la peticion a la base de datos: ${err}`);                       
                }else if(!eVentos){
                    res.status(404).send(`Error no hay eventos en la base de datos: ${err}`);                   
                }else{
                    //console.log('la data es: ' + eVentos)
                    return res.status(200).send({data:eVentos, message: 'Datos obtenidos correctamente'});             
                }    
        
            }); 

        }
    });

            
}

function nuevoEvento(req, res){
	let evento = new Evento({ 
        nombre: req.body.nombre,
        start: req.body.start, 
        title: req.body.title,
        end: req.body.end,
        start_hour: req.body.start_hour,
        end_hour: req.body.end_hour,
        usuario: req.body.usuario

    });
    evento.save((err, eVento) => {
         if (err){                    
                   res.status(500).send(`Error al guardar el evento en la base de datos: ${err}`)          
            }else if(!eVento) {
                   res.status(404).send(`Error no se localizo el evento en la base de datos: ${err}`) 
                   //console.log("no se guardo")
            }else{
                res.status(200).send({eVento: eVento, message: 'El nuevo evento se guardo satisfactoriamente'})
            }
    })
}

function actualizarEventoById(req, res){ 
     // console.log('El id de actualizar evento es: ' + req.body.id)     
      Evento.findById(req.body.id , (err, doc) => {
          if (err){
             res.status(500).send(`Error al buscar el evento en la base de datos: ${err}`)          
          }else if(!doc) {
                   res.status(404).send(`Error no se localizo el evento en la base de datos: ${err}`)                    
          }else{
             //aqui hago la actualizacion              
            doc.start = req.body.start             
            doc.end = req.body.end
            doc.start_hour = req.body.start_hour
            doc.end_hour = req.body.end_hour

             const actualizar = doc.save();
             if(actualizar){
                  res.status(200).send('Evento actualizado correctamente')
             }else{
                res.status(400).send('Error al actualizar el Evento')
             }
          }           
        })
}

function borrarEventosById(req, res){
   let id = req.params.eventById;
   Evento.findById(id,(err, event)=>{
        if (err){                    
                   res.status(500).send({message:`Error al realizar la peticion a la base de datos: ${err}`});           
        }else if(!event){
            res.status(404).send({message:`Error no se localizo el evento en la base de datos: ${err}`});       
        }else{
            //si lo encuentra lo borro
            event.remove((err) =>{
                if(err){
                    res.status(400).send(err); 
                }else{
                 //aqui voy        
                 res.status(200).send({ message: 'Evento borrado satisfactoriamente'}); 
                }
            })
            
        }
    });
}

function rutaPrivada(req, res){
	res.status(200).send({ message: 'Tienes Acceso'})
}



module.exports = {
	obtenerTodosUsuarios,
    obtenerUsuarioById,
	obtenerTodosEventos,
    obtenerEventosById,
    actualizarEventoById,
    borrarEventosById,
    obtenerEventosByUserId,
	nuevoEvento,
	rutaPrivada
}

