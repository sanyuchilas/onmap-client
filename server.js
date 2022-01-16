require('dotenv').config()
const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`port ${PORT}`)
    })
  } catch(e) {
    console.log(e)
  }
}

start()