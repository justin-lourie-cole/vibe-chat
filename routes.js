const express = require('express')

const fs = require('fs')

const router = express.Router()

// Helper funtion for retrieving data
function getData(callback) {
    fs.readFile('chatLog.json', 'utf8', (err, data) => {
        if(err) console.log(err)
        const viewData = JSON.parse(data)
        callback(viewData)
    })
}



router.get('/', (req, res) => {
    const template = 'chat'
    getData((data) => {
        res.render(template, data)
    })
})

// router.get('/', (req, res) => {
//     res.render('layouts/main')
// })

module.exports = router