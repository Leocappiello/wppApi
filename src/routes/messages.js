const express = require('express')
const app = express.Router()
const message = require('../models/messages')

app.get("/", async (req, res) => {
    try {
        const messagesDB = await message.find()
        res.send(messagesDB)
    } catch (error) {
        console.log(error)
    }
})

module.exports = app