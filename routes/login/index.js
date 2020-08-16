const needToken = require('../../plugins/needToken')

module.exports = app =>{
  const express = require('express')
  const router = express.Router({ mergeParams: true })
  const model = require(`../../modules/Users`)
  const modelad = require(`../../modules/Ads`)
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')

  //用户名重复检测
  router.get('/register:name',async(req,res)=>{
    // console.log(req.params)
    const result = await model.findOne({"userName":req.params.name})
    if(result){
      res.send('error')
    }else{
      res.send('ok')
    }
    
  })

  //管理员
  router.post('/admin',async(req,res)=>{
    let admin=app.get('admin')
    let panduan1=false,panduan2=false
    const {userName,password} = req.body
    for(let i of admin){
      if(i==userName){
        panduan1 = true
        break
      }
    }
    assert(panduan1,422,"未找到管理员账号")
    const user = await model.findOne({
      userName
    })
    const isValid = require('bcryptjs').compareSync(password,user.password)
    if(!isValid){
      return res.status(422).send({
        message:'密码错误'
      })
    }
    res.send('ok')
  })

  router.post('/register',async(req,res)=>{
    console.log(req.body)
    // req.body.userName = 'admin'
    try {
      const result = await model.create(req.body)
      res.send('ok')
    } catch (error) {
      console.log(error)
      res.send('error')
    }
  })
  router.put('/user',async(req,res)=>{
    const id = needToken(app, req.headers.authorization)
    const data = await model.findByIdAndUpdate(id,{"avatar":req.body.avatar})
    res.send(req.body.avatar)
  })
  router.get('/userset',async(req,res)=>{
    const id = needToken(app, req.headers.authorization)
    const data = await model.findById(id,["avatar","userName"])
    res.send(data)
  })
  router.post('/login', async (req, res) => {
    // const obj = {
    //   userName:'admin',
    //   password:'123456',
    //   stars:["5f26d96157169905b44cbde3"],
    //   avatar:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1376127766,1954361621&fm=26&gp=0.jpg",
    //   article:[("5f26d96157169905b44cbde3"),("5f26d96157169905b44cbdda"),("5f26d96157169905b44cbdd1"),("5f26d92857169905b44cbdc8")],
    // }
    // const result = await model.create(obj)
    // const result = await model.create(req.body)
    const {userName,password} = req.body
    
    //根据用户名查找用户
    const user = await model.findOne({
      userName
    })
    // console.log(user)
    assert(user,422,'用户名不存在')
    // if(!user){
    //   return res.status(422).send({
    //     message:'用户名不存在'
    //   })
    // }
    //校验密码
    const isValid = require('bcryptjs').compareSync(password,user.password)
    if(!isValid){
      return res.status(422).send({
        message:'密码错误'
      })
    }
    //返回token
    console.log(user)
    const token = jwt.sign({id:user._id},app.get('secret'))
    res.send({token,user})

  })
    
  //广告
  router.get('/ad',async(req,res)=>{
    // await modelad.create({
    //   img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2311510311,3909449138&fm=26&gp=0.jpg",
    //   link:"https://cn.vuejs.org/"
    // })
    // await modelad.create({
    //   img:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1402639174,3545935100&fm=26&gp=0.jpg",
    //   link:"http://nodejs.cn/"
    // })
    // await modelad.create({
    //   img:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2915449934,3377305849&fm=26&gp=0.jpg",
    //   link:"https://www.mongodb.org.cn/"
    // })
    const result = await modelad.find({})
    res.send(result)
  })
  
  //清空
 
  app.use('/server/api',router)

  
}