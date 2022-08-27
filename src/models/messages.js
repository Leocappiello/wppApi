const mongoose = require('mongoose')

//schema
const messageSchema = new mongoose.Schema({
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
    text: {
        type: String
    }
})

module.exports = mongoose.model('Message', messageSchema)