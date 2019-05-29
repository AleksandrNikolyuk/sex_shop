const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  code: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: true,
  },
  inStock: {
    type: Schema.Types.Boolean,
    default: true,
    index: true,
  },
  slug: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: true,
  },
  cost: {
    mainCost: {
      type: Schema.Types.Number,
      default: 0,
    },
    discountCost: {
      type: Schema.Types.Number,
      default: null,
    },
    isDiscount: {
      type: Schema.Types.Boolean,
      default: false,
      index: true,
    },
  },
  description: {
    short: {
      type: Schema.Types.String,
      default: null,
    },
    full: {
      type: Schema.Types.String,
      default: null,
    },
  },
  specifications: {
    type: Schema.Types.Map,
    of: String,
    default: null,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    default: null,
    index: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    default: null,
    index: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Seller',
    default: null,
    index: true,
  },
  category: [
    Schema.Types.ObjectId,
  ],
  photos: {
    type: [productImageSchema],
  },
}, {
  timestamps: true,
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
