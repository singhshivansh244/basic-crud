const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email:{
        type: String,
        required: true,
        max:50,
        unique: true
    },
    phone:{
        type: Number,
        min: 10
    },
    imageData:{
        type: String,
        default: "",
    }
});

module.exports = mongoose.model('Record', RecordSchema);