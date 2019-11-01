const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;
const { Connection } = require("../mongo_config/Connection");

const db = "entrega4";
const collection = "espacios";

/**
 * * CRUD
 */

/**
 * GET ALL
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
router.get("/:id", (req, res) => {
  try {
    Connection.connectToMongo()
      .then(database => {
        const client = database.db(db).collection(collection);

        client
          .find({ _id: ObjectId(req.params.id) })
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
 * GET ALL POR LOCALIDAD
 */
router.get("/:localidad", (req, res) => {
    try {
      Connection.connectToMongo()
        .then(database => {
          const client = database.db(db).collection(collection);
  
          client
            .find({ localidad: req.params.localidad })
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
 * UPDATE ONE
 */
router.patch("/:id", (req,res) =>{
    let update = {};
    if(req.body.direccion){
        update.direccion = req.body.direccion;
    }
    if(req.body.parqueadero){
        update.parqueadero = req.body.parqueadero;
    }
    if(req.body.costo){
        update.costo = req.body.costo;
    }
    if(req.body.descripcion){
        update.descripcion = req.body.descripcion;
    }
    if(req.body.localidad){
        update.localidad = req.body.localidad;
    }

    try{
        Connection.connectToMongo()
        .then(database =>{
            const client = database.db(db).collection(collection);

            client.findOneAndUpdate(
                { _id: ObjectId(req.params.id)},
                { $set : update},
                {returnOriginal : false},
                (err, result) =>{
                    if(err){
                        res.status(400).json({message : err.message});
                        return;
                    }
                    res.status(200).json(result.value);
                }
            );
        })
        .catch(err =>{
            res.status(500).json({message : err.message});
        });
    }catch(err){
        res.status(500).json({ErrorConexion: err.message})
    }
});

/**
 * POST ONE
 */
router.post("/", (req, res)=>{
    const new_espacio = {
        direccion : req.body.direccion,
        parqueadero : req.body.parqueadero,
        descripcion: req.body.descripcion,
        costo: req.body.costo,
        localidad: req.body.localidad,
    };

    try {
        Connection.connectToMongo()
        .then(database => {
            const client = database.db(db).collection(collection);

            client.insertOne(new_espacio, (err, result) =>{
                if(err){
                    res.status(400).json({message : err.message});
                    return;
                }
                res.status(201).send(result.ops);
            });
        })
        .catch(err =>{
            res.status(500).json({message : err.message});
        });
    } catch (err) {
        res.status(500).json({message : err.message});
    }
});

/**
 * DELETE ONE
 */
router.delete("/:id", (req, res) => {
  try {
    Connection.connectToMongo()
      .then(database => {
        const client = database.db(db).collection(collection);

        client.findOneAndDelete(
          { _id: ObjectId(req.params.id) },
          (err, result) => {
            if (err) {
              res.status(404).json({ message: err.message });
              return;
            }
            res.status(200).send({ message: result.value });
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
 * * RELACIONES
 */

/**
 * GET ALL RESERVAS DE UN ESPACIO
 */

 // TODO


 module.exports = router;

