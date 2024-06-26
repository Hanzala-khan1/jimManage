const mongoose = require("mongoose");
const mongoosePaginate = require('./plugin/model.paginate');

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    BusinessLocation: [{
        Gym: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Jim',
            required: false
        },
        package: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Packages',
            required: false
        },
        updated_on: {
            type: Date,
            required: false
        },
    }],
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
    images: {
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
        enum: ["active", "inactive", "blocked"],
        default: "inactive"
    },
    payment_status: {
        type: String,
        required: false,
        enum: ["paid", "unpaid"],
        default: "paid"
    },
    role: {
        type: String,
        default: false,
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
}, {
    timestamps: true
})
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema)