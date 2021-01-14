const express = require('express')
const fs = require('fs')

function updateScroll() {
  var element = document.getElementById('chatBox')
  element.scrollTop = element.scrollHeight
}

module.exports = updateScroll

const router = express.Router()

// Helper funtion for retrieving data
function getData(callback) {
  fs.readFile('chatLog.json', 'utf8', (err, data) => {
    if (err) console.log(err)
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

// Message POST route - rough draft
router.post('/', (req, res) => {
  getData((data) => {
    let newMessage = {
      user: req.body.user,
      message: req.body.message,
    }
    data.Messages.push(newMessage)
    fs.writeFile('./chatLog.json', JSON.stringify(data), (err) => {
      res.redirect('/')
    })
  })
})

// router.get('/', (req, res) => {
//     res.render('layouts/main')
// })

module.exports = router
