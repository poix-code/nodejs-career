'use strict'
const Product = require('../models/product')

function getProduct(req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: `Request error: ${err}` })
    if (!product) res.status(404).send({ message: `Product does not exist: ${product}` })

    res.status(200).send({ product })
  })
}

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if (err) res.status(500).send({ message: `Request error: ${err}` })
    if (!products) res.status(404).send({ message: `No products in the stock` })

    res.status(200).send({ products })
  })
}

function saveProduct(req, res) {
  console.log(" POST /api/product")
  console.log(JSON.stringify(req.body))

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if (err) res.status(500).send({ message: `Could not save to database: ${err}` })

    res.status(200).send({ product: productStored })
  })
}

function updateProduct(req, res) {
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err) res.status(500).send({ message: `Could not update the product: ${err}` })

    res.status(200).send({ product: productUpdated })
  })
}

function deleteProduct(req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({ message: `Delete error: ${err}` })

    product.remove(err => {
      if (err) res.status(500).send({ message: `Delete error: ${err}` })
      res.status(200).send({ message: `The product has benn removed.` })
      console.log(`Product removed, id: ${productId}`)
    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}