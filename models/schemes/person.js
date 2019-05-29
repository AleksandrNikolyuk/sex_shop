const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const personSchema = new Schema({
   
    name: {
        type: String,      
        required: true,     
        minlength: 2,       
        maxlength: 40,      
        trim: true,        
    },

    surname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40,
        trim: true,
    },
  
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200,
        trim: true,
        index: true,        
        unique: true,       
    },
  
    phone: {
        type: String,
        required: true,
        minlength: 15,
        maxlength: 15,
    },
  
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: false,    
        index: true         
    },

    birthday: {
        type: Date,        
        required: false
    },

    aboutMe: {
        type: String,
        required: false
    },

    address: {
        type: String,
        required: false
    },
  
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, {
    _id: false            
});

module.exports = personSchema;