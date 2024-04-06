const mongoose = require("mongoose");
const mongoosePaginate = require('./plugin/model.paginate');

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    BusinessLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jim',
        required: false
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
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg"
    },
    city: {
        type: String,
    },
    adress: {
        type: String,
    },
    status: {
        type: String,
        required: false,
        enum: ["active", "inactive", "blocked"]
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