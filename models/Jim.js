const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const JimShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
        default: "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg"
    },
    Owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jim',
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at:{
        type: Date,
        default: null
    }
})
JimShema.plugin(mongoosePaginate);

module.exports = mongoose.model("Jim", JimShema)