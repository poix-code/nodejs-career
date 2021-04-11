'use strict'
const express = require('express')
const app = express()

const api = require('./routes')

// Middelwares
app.use(express.urlencoded( { extended: false } ))
app.use(express.json())
app.use('/api', api)

module.exports = app