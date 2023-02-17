require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.CLUSTERURL}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);


module.exports = client;