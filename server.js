const express = require('express')
const hbs = require('express-handlebars')

const server = express()

const fs = require('fs')

const routes = require('./routes')

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
// server.get('/', (req, res) => {
//     res.render('chat')
// })

server.use('/', routes)

module.exports = server
