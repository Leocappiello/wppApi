//
const express = require('express')
const bodyparser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const fetch = require('node-fetch');

const app = express()

//env token wpp
require('dotenv').config('./.env')
require('./db/mongo')
require('./models/messages')

const token = process.env.WHASTAPP_TOKEN
const port = process.env.PORT || 3000


//settings
app.set('PORT', port)

//middles
app.use(bodyparser.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))

//route
app.use(require('./routes/index'))

//sv
app.listen(app.get('PORT'), () => {
    console.log("listen on port", app.get('PORT'));
})