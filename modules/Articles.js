const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  category:{
    value:String,
    children:[
      {type:String}
    ]
  },
  title:{type:String,required:true},
  content:{type:String,required:true},
  icon:{type:String},
  agree:{type:Number,default:0},
  time:{type:Number,required:true},
  writer:{type:mongoose.Schema.Types.ObjectId,required:true},
  comment:[
    {
      user:{type:mongoose.Schema.Types.ObjectId},
      content:String,
      time:Number,
      children:[
        {
          user:{type:mongoose.Schema.Types.ObjectId},
          content:String,
          time:Number
        }
      ]
    }
  ]
})


module.exports = mongoose.model('Articles',schema,'articles')