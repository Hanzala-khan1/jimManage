const mongoose = require("mongoose");
const mongoosePaginate = require('./plugin/model.paginate');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    BusinessLocation:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jim',
        required: false
    },
    Business:{
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
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
    status: {
        type: String,
        required: false,
        enum: ["active", "archived"]
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isJimAdmin: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema)