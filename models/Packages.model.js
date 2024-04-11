const mongoose = require('mongoose');
const mongoosePaginate = require('./plugin/model.paginate');

// Define the schema for GymPackage
const gymPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  durationMonths: {
    type: Number,
    required: true
  },
  includesClasses: {
    type: Boolean,
    default: false
  },
  classesPerWeek: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
gymPackageSchema.plugin(mongoosePaginate);

const GymPackage = mongoose.model('GymPackage', gymPackageSchema);

module.exports = GymPackage;
