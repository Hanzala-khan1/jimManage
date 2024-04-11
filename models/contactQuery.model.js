const mongoose = require("mongoose");
const mongoosePaginate = require('./plugin/model.paginate');

const contactQuerySchema = new mongoose.Schema({
    frist_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    contact_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    contact_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    message: {
        type: String,
        required: false
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jim',
        require,d: false
    },
    updated_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jim',
        required: false
    },
    created_at:{
        type: Date,
        default: Date.now()
    },
    updated_at:{
        type: Date,
        default: null
    }
}, {
    timestamps: true
})
JimShema.plugin(contactQuerySchema);

module.exports = mongoose.model("ContachQuery", contactQuerySchema)