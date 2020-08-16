const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  content:{type:String},
  writer:{type:mongoose.Schema.Types.ObjectId,required:true},
})


module.exports = mongoose.model('Fankui',schema,'fankui')