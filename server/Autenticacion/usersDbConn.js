const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb+srv://juanca8520:kitaruto211@cluster0-inysf.mongodb.net/test?retryWrites=true&w=majority';
const url = 'mongodb://grupo5:grupo5@ds121406.mlab.com:21406/entrega4';

module.exports = MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });