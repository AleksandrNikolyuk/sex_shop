const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
