'use strict'
const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { findByIdAndUpdate } = require('./models/product')
const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3000

// Middelwares
app.use(express.urlencoded( { extended: false } ))
app.use(express.json())

app.get('/api/product', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) res.status(500).send( {message:`Request error: ${err}`} )
    if (!products) res.status(404).send( {message: `No products in the stock`} )

    res.status(200).send( {products} )
  })
})

app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send( {message: `Request error: ${err}`} )
    if (!product) res.status(404).send( {message: `Product does not exist: ${product}`} )

    res.status(200).send( {product} )
  })
})

app.post('/api/product', (req, res) => {
  console.log(" POST /api/product")
  console.log(JSON.stringify(req.body))

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save( (err, productStored) => {
    if (err) res.status(500).send({message: `Could not save to database: ${err}`})

    res.status(200).send({product: productStored})
  })
})

app.put('/api/product/:productId', (req, res) => {
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err) res.status(500).send({message: `Could not update the product: ${err}`})

    res.status(200).send( {product: productUpdated} )
  })
})

app.delete('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send( {message: `Delete error: ${err}`} )

    product.remove(err => {
      if (err) res.status(500).send( {message: `Delete error: ${err}`} )
      res.status(200).send( {message: `The product has benn removed.`} )
      console.log(`Product removed, id: ${productId}`)
    })
  })
})

mongoose.connect('mongodb://localhost:27017/shop-test',
{ useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify : false}, (err, res) => {
  if (err) {
    console.log(`Data base error connection: ${err}`)
  }
  console.log("Data base connection succesful")

  app.listen(port, () => {
    console.log(`API REST runs on http://localhost:${port}`)
  })
})

