const Product = require("../models/Product");
const asyncHandler = require('express-async-handler')

// @desc Get all products 
// @route GET /products
// @access Private
const getAllProducts = asyncHandler(async (req, res) => {
    // Get all products from MongoDB
    const products = await Product.find().lean()

    // If no products 
    if (!products?.length) {
        return res.status(400).json({ message: 'No products found' })
    }


    
})

// @desc Create new product
// @route POST /products
// @access Private
const createNewProduct = asyncHandler(async (req, res) => {
    const { name, description, price,Category,tags,countInStock } = req.body

    // Confirm data
    if (!name || !description || !price || !countInStock) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Product.findOne({ name }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate product title' })
    }

    // Create and store the new user 
    const product = await Product.create({ name, description, price,Category,tags,countInStock })

    if (product) { // Created 
        return res.status(201).json({ message: 'New product created' })
    } else {
        return res.status(400).json({ message: 'Invalid product data received' })
    }

})

// @desc Update a product
// @route PATCH /products
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
    const { id, name, description, price,Category,tags,countInStock } = req.body

    // Confirm data
    if (!id || !name || !description || !price || !countInStock) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm product exists to update
    const product = await Product.findById(id).exec()

    if (!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    // Check for duplicate title
    const duplicate = await Product.findOne({ name }).lean().exec()

    // Allow renaming of the original product 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate product title' })
    }

    product.name = name
    product.description = description
    product.price = price
    product.Category = Category
    product.tags = tags
    product.countInStock = countInStock

    const updatedProduct = await product.save()

    res.json(`'${updatedProduct.title}' updated`)
})

// @desc Delete a product
// @route DELETE /products
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Product ID required' })
    }

    // Confirm product exists to delete 
    const product = await Product.findById(id).exec()

    if (!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    const result = await product.deleteOne()

    const reply = `Product '${result.name}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct
}