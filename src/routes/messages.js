const express = require('express')
const app = express.Router()
const message = require('../models/messages')

app.get("/", async (req, res) => {
    try {
        const messagesDB = await message.find()
        res.send(messagesDB)
    } catch (error) {
        res.sendStatus(404)
        console.log(error)
    }
})

app.get("/:id", async (req, res) => {
    let {id} = req.params
    
    if(!isNaN(id)){
        try {
            const messagesDB = await message.find({
                "from": id, 
            })
            res.send(messagesDB)
        } catch (error) {
            res.sendStatus(404)
            console.log(error)
        }
    } else {
        res.sendStatus(404)
    }
})

module.exports = app