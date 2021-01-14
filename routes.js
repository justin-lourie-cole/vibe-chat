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

// Message POST route - rough draft
router.post("/", (req, res) => {
  const template = "chat"
  const messagePost = req.body
// retrieve post data
  getData((data) => {
      let messages = data.find(item => {
          return item.Messages
      })
      let newMessage = {
        Messages.user = messagePost.user
        Messages.message = messagePost.message
        }
      Messages.push(newMessage)
      const stringMessage = JSON.stringify(data, null, 2)

  fs.writeFile("chatLog.json", stringMesssage, "utf8", (err, data) => {
    if (err) console.log(err)
    res.redirect("/")
  })
})
}

// router.get('/', (req, res) => {
//     res.render('layouts/main')
// })

module.exports = router
