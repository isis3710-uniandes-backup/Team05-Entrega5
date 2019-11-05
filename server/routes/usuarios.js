const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;
const { Connection } = require("../mongo_config/Connection");

const db = "entrega4";
const collection = "usuarios";
const pagos_collection = "pagos";
var HandlerGenerator = require("../Autenticacion/HandlerGenerator.js");

HandlerGenerator = new HandlerGenerator();
/**
 * GET ALL-
 */
router.get("/", (req, res) => {
  try {
    Connection.connectToMongo()
      .then(async database => {
        const client = database.db(db).collection(collection);

        await client
          .find({})
          .toArray()
          .then(x => res.status(200).json(x))
          .catch(err => res.status(500).json({ message: err.message }));
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET ONE
 */
router.get("/:idUsuario", (req, res) => {
  try {
    Connection.connectToMongo()
      .then(database => {
        const client = database.db(db).collection(collection);

        client
          .find({ _id: ObjectId(req.params.idUsuario) })
          .toArray()
          .then(x => res.status(200).json(x))
          .catch(err => res.status(404).json({ message: err.message }));
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * LOGIN
 */
router.post("/login", HandlerGenerator.login)

/**
 * POST
 */

 router.post("/", HandlerGenerator.registro);

/**
 * PATCH
 */
router.patch("/:idUsuario", (req, res) => {
  let updating = {};
  if (req.body.nombre) {
    updating.nombre = req.body.nombre;
  }
  if (req.body.nombreUsuario) {
    updating.nombreUsuario = req.body.nombreUsuario;
  }
  if (req.body.contrasenia) {
    updating.contrasenia = req.body.contrasenia;
  }
  if (req.body.correo) {
    updating.correo = req.body.correo;
  }
  if (req.body.rol) {
    updating.rol = req.body.rol;
  }

  try {
    Connection.connectToMongo()
      .then(database => {
        const client = database.db(db).collection(collection);

        client.findOneAndUpdate(
          { _id: ObjectId(req.params.idUsuario) },
          { $set: updating },
          { returnOriginal: false },
          (err, result) => {
            if (err) {
              res.status(400).json({ message: err.message });
              return;
            }
            res.status(200).json(result.value);
          }
        );
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * DELETE
 */
router.delete("/:idUsuario", (req, res) => {
  try {
    Connection.connectToMongo()
      .then(database => {
        const client = database.db(db).collection(collection);

        client.findOneAndDelete({ _id: ObjectId(req.params.idUsuario) }, (err, result) => {
          if (err) {
            res.status(404).json({ message: err.message });
            return;
          }
          res.status(200).send(result.value);
        });
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * MÉTODOS ÚTILES PARA ACCEDER A PAGOS DEL USUARIO
 */

 /**
 * GET all pagos from usuario given an id
 */
// router.get("/:idUsuario/pagos", (req,res) => {
//   try {
//       Connection.connectToMongo()
//           .then(database => {
//               const client = database.db(db).collection("reservas");
//               client
//                   .find({ _idUsuario: ObjectId(req.params.idUsuario) })
//                   .toArray()
//                   .then(x => {
//                       let respuesta = [];
//                       let client2 = database.db(db).collection(pagos_collection);
//                       x.forEach(async r => {
//                         await client2
//                           .find({ _idReserva: ObjectId(r._id) })
//                           .toArray()
//                           .then(ans => respuesta.push(ans))
//                           .catch(err => res.status(500).json({ message: err.message }));
//                       });
//                       res.status(200).json(respuesta);
//                     }
//                   )
//                   .catch(err => res.status(404).json({ message: err.message }));
//           })
//           .catch(err => {
//               res.status(500).json({ message: err.message });
//           });
//   } catch (err) {
//       res.status(500).json({ message: err.message });
//   }
// });
router.get("/:idUsuario/pagos", (req,res) => {
  try {
      Connection.connectToMongo()
          .then(database => {
              const client = database.db(db).collection("reservas");
              client.aggregate([
                {$match: { _idUsuario: ObjectId(req.params.idUsuario) }},
                {
                  $lookup: {
                    from: "pagos",
                    localField: "_id",
                    foreignField: "_idReserva",
                    as: "pagosReserva"
                  }
                }
              ],
              (err, cursor) => {
                if(err)
                  res.status(500).json({ message: err.message });
                cursor.toArray((err, documents) => {
                  if(err)
                    res.status(500).json({ message: err.message });
                  let respuesta = [];
                  documents.forEach( item => {
                    respuesta.push(item.pagosReserva);
                  });
                  res.status(200).json(respuesta);
                });
              })
          })
          .catch(err => {
              res.status(500).json({ message: err.message });
          });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

/**
 * ? Export
 */
module.exports = router;
