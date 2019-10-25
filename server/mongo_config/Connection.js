require("dotenv").config(); 
const MongoClient = require('mongodb').MongoClient;

class Connection {
    static async connectToMongo() {
        if ( this.db ) return Promise.resolve(this.db);

        try {
            return MongoClient.connect(this.url, this.options)
            .then(db => {
                this.db = db;
                console.log('DB Connection Established.');
            })
            .catch(err => console.log('DB Connection Error :: ', err.message));
        } catch(err) {
            console.log('Connection Error :: ', err.message);
        }
        
    }
}

Connection.db = null;
Connection.url = process.env.MLAB;
Connection.options = {
    bufferMaxEntries:   0,
    reconnectTries:     5000,
    useNewUrlParser:    true,
    useUnifiedTopology: true
};

module.exports = { Connection }