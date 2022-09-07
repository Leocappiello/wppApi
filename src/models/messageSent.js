const mongoose = require('mongoose')

//schema
const messageSentSchema = new mongoose.Schema({
    from: {
        type: Number //whatsapp-id, 
    },
    id: {
        type: String
    },
    type: {
        type: String, //text
    },
    timestamp: {
        type: Number,
    },
    message: {
        type: String
    }
})

module.exports = mongoose.model('MessageSent', messageSentSchema)