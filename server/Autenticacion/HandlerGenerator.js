let jwt = require('jsonwebtoken');
let config = require('./config.js');
let seguridad = require('./seguridad');

let conn = require('./usersDbConn');

class HandlerGenerator {

    login( req, res ) {
      // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
      let nombreUsuario = req.body.nombreUsuario;
      let contrasenia = req.body.contrasenia;
      
      // Si se especifico un usuario y contraseña, proceda con la validación
      // de lo contrario, un mensaje de error es retornado
      if( nombreUsuario && contrasenia ) {
          // Se actualiza el password a como está en la base de datos
          contrasenia = seguridad.encriptar(contrasenia);
          // Se verifica que existan en la base de datos
          seguridad.verificarUsuario(nombreUsuario, contrasenia)
          .then( doc => {
              if(!doc) {
                  res.status( 403 ).json({
                      success: false,
                      message: 'Incorrect username or password'
                  });
              }
              // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
              else {
  
                  // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
                  let token = jwt.sign( { nombreUsuario: doc.nombreUsuario, rol: doc.rol, nombre: doc.nombre, correo: doc.correo },
                  config.secret, { expiresIn: '24h' } );
                  
                  // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
                  res.status(200).json({
                      success: true,
                      message: 'Successfully added token to user',
                      token: token
                  });
              } 
          })
          .catch( err => {
              res.status( 500 ).json({
                  success: false,
                  message: `Authentication failed! There was an error during the process: ${err}`
              });
          });
      } else {
  
        // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
        res.status( 400 ).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
    }
  
    index( req, res ) {
      // Retorna una respuesta exitosa con previa validación del token
      res.status(200).json({
        success: true,
        message: 'Index page'
      });
    }
  
    registro( req, res ) {
      // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
      let nombreUsuario = req.body.nombreUsuario;
      let contrasenia = req.body.contrasenia;
      let rol = req.body.rol;
      let nombre = req.body.nombre;
      let correo = req.body.correo;
  
      if( nombreUsuario && contrasenia && rol && nombre && correo) {
          contrasenia = seguridad.encriptar(contrasenia);
          seguridad.verificarUsuario(nombreUsuario, contrasenia)
          .then( doc => {
              if(!doc) {
                  conn.then( client => {
                      client.db().collection(config.USUARIOS).insertOne(
                          { nombreUsuario: nombreUsuario, contrasenia: contrasenia, rol: rol, nombre: nombre, correo: correo },
                          (err, r) => {
                              if (err) {
                                  res.status(500).json({
                                      success: false,
                                      message: `Error while inserting new user into the database: ${err}`
                                  });
                              }
                              else {
                                  res.status(200).json({
                                      success: true,
                                      message: 'Successfully created new user',
                                      data: {
                                          nombreUsuario: nombreUsuario,
                                          rol: rol
                                      }
                                  });
                              }
                          }
                      );
                  });
              }
              else {
                  res.status( 403 ).json({
                      success: false,
                      message: 'User already registered, please log in!'
                  });
              }
          })
          .catch( err => {
              res.status( 500 ).json({
                  success: false,
                  message: `Authentication failed! There was an error during the process: ${err}`
              });
              throw err;
          });
      }
      else {
          res.status( 400 ).json({
              success: false,
              message: 'Authentication failed! Please check the request'
          });
      }
    }
  }
  
  module.exports = HandlerGenerator;