const express = require("express")

const fs = require("fs")

const router = express.Router()

// Helper funtion for retrieving data
function getData(callback) {
  fs.readFile("chatLog.json", "utf8", (err, data) => {
    if (err) console.log(err)
    const viewData = JSON.parse(data)
    callback(viewData)
  })
}

router.get("/", (req, res) => {
  const template = "chat"
  getData((data) => {
    res.render(template, data)
  })
})

router.post('/likemsg/:id', (req, res) => {
  getData((data) => {
      message = data.Messages.find(({ id }) => id === Number(req.params.id))
      if (!message.like) {
        message.like = true
      } else {
        message.like = false
      }
      data.Messages[Number(req.params.id)-1] = message
      fs.writeFile('./chatLog.json', JSON.stringify(data, null, 2), (err) => {
        res.redirect('/')
      })
  })
})

// Message POST route - rough draft
router.post('/', (req, res) => {
  getData((data) => {
    let newMessage = {
      user: req.body.user,
      message: req.body.message,
      like: false
    }
    data.Messages.push(newMessage)
    fs.writeFile('./chatLog.json', JSON.stringify(data, null, 2), (err) => {
      res.redirect('/')
    })
  })
})

// router.get('/', (req, res) => {
//     res.render('layouts/main')
// })

module.exports = router
