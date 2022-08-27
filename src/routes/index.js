const express = require('express')
const router = express.Router()
const fs = require('fs')

const PATH = __dirname

router.get('/', (req, res) => {
    res.send('frontend')
})

const removeExtension = (file) => {
    return file.split('.').shift()
}

fs.readdirSync(PATH).filter((file) => {
    const name = removeExtension(file)
    if (name !== 'index') {
        console.log(`loading route ${name}`)
        router.use(`/${name}`, require(`./${file}`))
    }
})

module.exports = router