const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  img:{type:String},
  link:{type:String},
})


module.exports = mongoose.model('Ads',schema,'ads')