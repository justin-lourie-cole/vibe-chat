const express = require('express')

const fs = require('fs')

const router = express.Router()



router.get('/', (req, res) => {
    fs.readFile('chatLog.json', 'utf8', (err, data) => {
        if(err) console.log(err)
        const viewData = JSON.parse(data)
        res.render('chat', viewData)
    })
})

module.exports = router