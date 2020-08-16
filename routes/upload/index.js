const assert = require('http-assert')


module.exports = app => {
  const express = require('express')
  // const router = express.Router({ mergeParams: true })
  const multer = require('multer')
  // const upload = multer({dest:__dirname + '/../../uploads'})
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    },
    
  })
  function fileFilter (req, file, cb) {
    // 这个函数应该调用 `cb` 用boolean值来
    // 指示是否应接受该文件
    if(file.mimetype!='image/jpeg'&&file.mimetype!='image/png'&&file.mimetype!='image/jpg'){
      cb(null, false)
      // assert(false,422,'nmsl')
      cb(new Error('文件类型必须是jpg/png'))
    }
    // 拒绝这个文件，使用`false`，像这样:
    else{
      cb(null, true)
    }
    // 接受这个文件，使用`true`，像这样:
    
  
    // // 如果有问题，你可以总是这样发送一个错误:
    
  
  }
  var upload = multer({ storage: storage ,fileFilter:fileFilter})

  app.post('/server/api/upload',upload.single('file'),async(req,res)=>{
    const file = req.file
    console.log(file)
    file.url = `http://81.70.59.91:3000/uploads/${file.filename}`
    res.send(file)
  })
}