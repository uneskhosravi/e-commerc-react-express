const mongoose = require("mongoose");
const URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 128
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
  },
  price: {
        type: Number,
        required:true
    },
  countInStock:{
        type: Number ,
        required:true
  },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }],
    warranty: {
        type: String,
        trim: true,
        maxlength: 32
    },
    size: [{
        type: String,
        trim: true,
        maxlength: 32
    }],
    color: [{
        type: String,
        trim: true,
        maxlength: 128
    }],
    tags: [{
        type: String
    }]
   
}, { timestamps: true });
productSchema.plugin(URLSlugs('name', { field: 'slug', update: true }));
module.exports = mongoose.model("product", productSchema);