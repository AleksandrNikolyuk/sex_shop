const mongoose = require('mongoose');

const { Schema } = mongoose;

const countrySchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: true,
    minlength: 2,
    maxlength: 20,
  },
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
