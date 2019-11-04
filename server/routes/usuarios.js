const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;
const { Connection } = require("../mongo_config/Connection");

const db = "entrega4";
const collection = "usuarios";

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
 * POST
 */
router.post("/", (req, res) => {
  const new_user = {
    nombre: req.body.nombre,
    nombreUsuario: req.body.nombreUsuario,
    email: req.body.email,
    contrasenia: req.body.contrasenia,
    tipo: req.body.tipo
  };

  try {
    Connection.connectToMongo()
      .then(database => {
        const client = database.db(db).collection(collection);

        client.insertOne(new_user, (err, result) => {
          if (err) {
            res.status(400).json({ message: err.message });
            return;
          }
          res.status(201).send(result.ops);
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
 * PATCH
 */
router.patch("/:idUsuario", (req, res) => {
  let updating = {};
  if (req.body.email) {
    updating.email = req.body.email;
  }
  if (req.body.nombre) {
    updating.nombre = req.body.nombre;
  }
  if (req.body.nombreUsuario) {
    updating.nombreUsuario = req.body.nombreUsuario;
  }
  if (req.body.contrasenia) {
    updating.contrasenia = req.body.contrasenia;
  }
  if (req.body.tipo) {
    updating.nombreUsuario = req.body.nombreUsuario;
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
 * MÉTODOS ÚTILES PARA ACCEDER A LOS PEDIDOS DE UN USUARIO
 */

 /**
 * GET all pedidos from usuario given an id
 */
router.get("/:idUsuario/pedidos", (req,res) => {
  try {
      Connection.connectToMongo()
          .then(database => {
              const client = database.db(db).collection(pedidosCollection);

              client
                  .find({ _idUsuario: ObjectId(req.params.idUsuario) })
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
})

// API DE METODOS DE PAGO

/**
 * GET ALL METODOS
 */
router.get("/:idUsuario/metodosDePago", (req, res) => {
  try {
      Connection.connectToMongo()
          .then(async database => {
              const client = database.db(db).collection(collectionMetodos);

              await client
                  .find({ _idUsuario: ObjectId(req.params.idUsuario) })
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
* GET ONE METODO
*/
router.get("/:idUsuario/metodosDePago/:id", (req, res) => {
  try {
      Connection.connectToMongo()
          .then(database => {
              const client = database.db(db).collection(collectionMetodos);

              client
                  .find({ $and: [{ _idUsuario: ObjectId(req.params.idUsuario) }, { _id: ObjectId(req.params.id) }] })
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
* POST METODO
*/
router.post("/:idUsuario/metodosDePago", (req, res) => {
  const new_metodo = {
      nombre: req.body.nombre,
      tipo: req.body.tipo,
      numero: req.body.numero,
      _idUsuario: ObjectId(req.params.idUsuario)
  };

  try {
      Connection.connectToMongo()
          .then(database => {
              const client = database.db(db).collection(collectionMetodos);

              client.insertOne(new_metodo, (err, result) => {
                  if (err) {
                    res.status(400).json({ message: err.message });
                    return;
                  }
                  res.status(201).send(result.ops);
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
* PATCH METODO
*/
router.patch("/:idUsuario/metodosDePago/:id", (req, res) => {
  let updating = {};
  if (req.body.nombre) {
      updating.nombre = req.body.nombre;
  }
  if (req.body.tipo) {
      updating.tipo = req.body.tipo;
  }
  if (req.body.numero) {
      updating.numero = req.body.numero;
  }

  try {
      Connection.connectToMongo()
          .then(database => {
              const client = database.db(db).collection(collectionMetodos);

              client.findOneAndUpdate(
                  { $and: [{ _idUsuario: ObjectId(req.params.idUsuario) }, { _id: ObjectId(req.params.id) }] },
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
* DELETE METODO
*/
router.delete("/:idUsuario/metodosDePago/:id", (req, res) => {
  try {
      Connection.connectToMongo()
          .then(database => {
              const client = database.db(db).collection(collectionMetodos);

              client.findOneAndDelete(
                  { $and: [{ _idUsuario: ObjectId(req.params.idUsuario) }, { _id: ObjectId(req.params.id) }] }, 
                  (err, result) => {
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
 * ? Export
 */
module.exports = router;
