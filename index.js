const express = require("express")

const app = express()
app.use(require('cors')())
app.use(express.json())
app.use('/',express.static(__dirname + '/public'))
app.use('/uploads',express.static(__dirname + '/uploads'))

//token密钥
app.set('secret','1224234asrt')//加密密钥
app.set('admin',['站长','admin','江南土拨鼠'])//管理员用户名

require('./plugins/db')(app)
require('./routes/upload')(app)


require('./routes/articles')(app)
require('./routes/login')(app)

//错误处理
app.use(async (err,req,res,next)=>{
  res.status(err.statusCode || 500).send({
    message:err.message
  })
})
app.listen(3000,()=>{
  console.log(3000)
})