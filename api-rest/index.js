'use strict'
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

// Middelwares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/hola/:name', (req, res) => {
  res.send({"message": `Hola ${req.params.name}`})
})

app.listen(port, () => {
  console.log(`API REST runs on http://localhost:${port}`)
})
