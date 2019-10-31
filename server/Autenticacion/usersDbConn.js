const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://juanca8520:kitaruto211@cluster0-inysf.mongodb.net/test?retryWrites=true&w=majority';

module.exports = MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });