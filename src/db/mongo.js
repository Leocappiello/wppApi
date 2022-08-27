const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');

//credentials
const dbname = 'wppapi'
const user = process.env.USERDB
const password = process.env.PASSWORDDB
const cluster = process.env.MONGO_URI
const uri = `mongodb+srv://${user}:${password}@${cluster}${dbname}?retryWrites=true&w=majority`

//connection
const client = new MongoClient(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

mongoose.connect(uri)
    .then(() => {
        const collection = client.db("test").collection("messages");
        // perform actions on the collection object
    })
    .then(() => console.log("DB Connected"))
    .catch(e => console.log('db error:' + e))
