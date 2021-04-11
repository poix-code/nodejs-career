const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err, res) => {
    if (err) {
      console.log(`Data base error connection: ${err}`)
    }
    console.log("Data base connection succesful")

    app.listen(config.port, () => {
      console.log(`API REST runs on http://localhost:${config.port}`)
    })
  })

