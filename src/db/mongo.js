const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');

//credentials
const dbname = 'wppapi'
const user = process.env.USERDB
const password = process.env.PASSWORDDB
const cluster = process.env.MONGO_URI
const status = process.env.STATUS
const uri = `mongodb+srv://${user}:${password}@${cluster}${dbname}?retryWrites=true&w=majority`
let url = '' 

//connection
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

(status == 'local') ? url = process.env.DB : url = uri  

mongoose.connect(url)
        .then(() => status)
        .then(() => {
            const collection = client.db("test").collection("messages");
        })
        .then(() => console.log("DB Connected"))
        .catch(e => console.log('db error:' + e))