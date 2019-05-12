const mongoose = require('mongoose')

const carPriceSchema = new mongoose.Schema({
  carType: {
    type: String,
    required: true,
    maxlength: 100
  },
  daytimePrice: {
    type: String,
    required: true,
    maxlength: 100
  },
  nighttimePrice: {
    type: String,
    required: true,
    maxlength: 200
  }
})

const carPrice = mongoose.model('CarPrice', carPriceSchema)
module.exports = carPrice
