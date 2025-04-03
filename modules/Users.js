const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userName:{type:String,maxlength:10,minlength:2},
  password:{
    type:String,
    set(val){
      return require('bcryptjs').hashSync(val,10)
    }
  },
  stars:[{type:mongoose.Schema.Types.ObjectId}],
  avatar:{type:String,default:"http://127.0.0.1:3000/uploads/file-1596917732295"},
  article:[{type:mongoose.Schema.Types.ObjectId}],
  agreed:[{type:mongoose.Schema.Types.ObjectId}]
})


module.exports = mongoose.model('Users',schema,'users')