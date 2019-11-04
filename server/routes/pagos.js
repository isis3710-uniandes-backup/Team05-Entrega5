const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;
const { Connection } = require("../mongo_config/Connection");

const db = "entrega4";
const collection = "pagos";

/**
 * GET One
 */
router.get("/:id", (req,res)=>{
    try{
        Connection.connectToMongo()
        .then(database =>{
            const client = database.db(db).collection(collection);

            client
            .find({ _id: ObjectId(req.params.id)})
            .toArray()
            .then(x => res.status(200).json(x))
            .catch(err => res.status(404).json({ message: err.message}));
        })
        .catch(err =>{
            res.status(500).json({ message: err.message});
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }

});


/**
 * POST One
 */
router.post("/", (req,res)=>{

    let imagenMetodoPago = "";

    if(req.body.metodoPago === "Tarjeta de Credito"){
        imagenMetodoPago = "https://i.ibb.co/DpfD4wP/money-1.png";

    } else if(req.body.metodoPago === "Efectivo"){
        imagenMetodoPago ="https://i.ibb.co/k55F3Hq/credit-card.png";

    }else{
        imagenMetodoPago ="https://i.ibb.co/YkCHJmV/leather-wallet.png";
    }
    const newPago = {
        cantidad : req.body.cantidad,
        metodoPago : req.body.metodoPago,
        fecha : Date(req.body.fecha),
        _idReserva: ObjectId(req.body._idReserva),
        imagen : imagenMetodoPago,
    };

    try{
        Connection.connectToMongo()
        .then(database => {
            const client = database.db(db).collection(collection);

            client.insertOne(newPago, (err,result) =>{
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
    } catch(err){
        res.status(500).json({message : err.message});
    }
});

/**
 * UPDATE ONE
 */
router.patch("/:id", (req, res) => {
    let update = {};
    if(req.body.cantidad){
        update.cantidad = req.body.cantidad;
    }
    if(req.body.metodoPago){
        
        update.metodoPago = req.body.metodoPago;

        let imagenMetodoPago = "";

        if(req.body.metodoPago === "Tarjeta de Credito"){
        imagenMetodoPago = "https://i.ibb.co/DpfD4wP/money-1.png";

        } else if(req.body.metodoPago === "Efectivo"){
        imagenMetodoPago ="https://i.ibb.co/k55F3Hq/credit-card.png";

        }else{
        imagenMetodoPago ="https://i.ibb.co/YkCHJmV/leather-wallet.png";
        }

        update.imagen = imagenMetodoPago;
    }
    if(req.body.fecha){
        update.fecha = Date(req.body.fecha);
    }

    try{
        Connection.connectToMongo()
        .then(database =>{
            const client =database.db(db).collection(collection);

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
        res.status(500).json({Error : err.message});
    }
});

/**
 * DELETE One
 */
router.delete("/:id", (req,res) =>{
    try{
        Connection.connectToMongo()
        .then(database => {
            const client = database.db(db).collection(collection);

            client.findOneAndDelete(
                { _id : ObjectId(req.params.id)},
                (err , result) => {
                    if(err){
                        res.status(404).json({message : err.message});
                        return;
                    }
                    res.status(200).send({ message : result.value});
                }
            );
        })
        .catch(err => {
            res.status(500).json({ message : err.message});
        });
    } catch(err){
        res.status(500).json({ message : err.message});
    }
});

/**
 *  RELACIONES
 */

  /**
 * GET One dado una reserva
 */
router.get("/reserva/:idReserva", (req,res) =>{
    try{
        Connection.connectToMongo()
        .then(database =>{
            const client = database.db(db).collection(collection);

            client
            .find({ _idReserva : ObjectId(req.params.idReserva) })
            .toArray()
            .then(x => res.status(200).json(x))
            .catch(err => res.status(404).json({ message : err.message}));
        })
        .catch(err => {
            res.status(500).json({ message : err.message});
        });
    } catch(err){
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;