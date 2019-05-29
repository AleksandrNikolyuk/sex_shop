const mongoose = require('mongoose');

const { Schema } = mongoose;

const brandSchema = new Schema({
  name: {
    type: Schema.Types.String,
    equired: true,
    trim: true,
    unique: true,
    minlength: 2,
    maxlength: 50,
  },
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
