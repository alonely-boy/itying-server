const mongoose = require('mongoose')
const needToken = require('../../plugins/needToken')
const assert = require('http-assert')
const fs = require('fs')
const path = require('path')
module.exports = app => {
  const express = require('express')
  const router = express.Router({ mergeParams: true })
  const model = require(`../../modules/Articles`)
  const modelUser = require(`../../modules/Users`)
  const modelFankui = require(`../../modules/Fankui`)
  
  //删除无用的上传图片
  router.delete('/upload',async(req,res)=>{
    let count = 0
    const id = needToken(app, req.headers.authorization)
    const result = fs.readdirSync(path.resolve(__dirname + '../../../uploads'))
    // console.log(result)
    for(let i of result){
      const result1 = await modelUser.findOne({'avatar':{$regex:i}})
      if(result1){
        continue
      }else{
        const result2 = await model.findOne({'content':{$regex:i}})
        if(!result2){
          fs.unlinkSync(path.resolve(__dirname + `../../../uploads/${i}`))
          count++;
        }
      }
    }
    res.send({result:'ok',count})
  })
  //反馈信箱
  router.post('/fankui', async (req, res) => {
    let obj = {}
    const id = needToken(app, req.headers.authorization)
    obj.content = req.body.content
    obj.writer = id
    await modelFankui.create(obj)
    res.send('ok')
  })
  router.post('/', async (req, res) => {//write 暂时
    const id = needToken(app, req.headers.authorization)
    // console.log(req.body)
    req.body.writer = id
    const result = await model.create(req.body)
    await modelUser.updateOne({ _id: id },
      {
        $addToSet: {
          "article": result._id
        }
      })
    res.send('ok')

  })
  //首页内容get
  router.get('/', async (req, res) => {
    const pagesize = Number(req.query.pagesize)
    const pagenum = Number(req.query.pagenum)
    const total = await model.find().countDocuments()
    const result = await model.aggregate([
      {
        $match: {}
      },
      {
        $lookup: {
          from: 'users',
          localField: 'writer',
          foreignField: '_id',
          as: 'writer'
        }
      },
      {
        $sort: { "time": -1 }
      },
      {
        $skip: pagesize * (pagenum - 1)
      },
      {
        $limit: pagesize
      }
    ])
    let results = {}
    results.result = result
    results.total = total
    res.send(results)
  })

  router.get('/school', async (req, res) => {
    const pagesize = Number(req.query.pagesize)
    const pagenum = Number(req.query.pagenum)
    const total = await model.find({ "category.value": "校园生活" }).countDocuments()
    const result = await model.aggregate([
      {
        $match: { "category.value": "校园生活" }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'writer',
          foreignField: '_id',
          as: 'writer'
        }
      },
      {
        $sort: { "time": -1 }
      },
      {
        $skip: pagesize * (pagenum - 1)
      },
      {
        $limit: pagesize
      }
    ])
    let results = {}
    results.result = result
    results.total = total
    res.send(results)
  })

  router.get('/it', async (req, res) => {
    const pagesize = Number(req.query.pagesize)
    const pagenum = Number(req.query.pagenum)
    const total = await model.find({ "category.value": "IT技术" }).countDocuments()
    const result = await model.aggregate([
      {
        $match: { "category.value": "IT技术" }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'writer',
          foreignField: '_id',
          as: 'writer'
        }
      },
      {
        $sort: { "time": -1 }
      },
      {
        $skip: pagesize * (pagenum - 1)
      },
      {
        $limit: pagesize
      }
    ])
    let results = {}
    results.result = result
    results.total = total
    res.send(results)
  })

  router.get('/share', async (req, res) => {
    const pagesize = Number(req.query.pagesize)
    const pagenum = Number(req.query.pagenum)
    const total = await model.find({ "category.value": "经验分享" }).countDocuments()
    const result = await model.aggregate([
      {
        $match: { "category.value": "经验分享" }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'writer',
          foreignField: '_id',
          as: 'writer'
        }
      },
      {
        $sort: { "time": -1 }
      },
      {
        $skip: pagesize * (pagenum - 1)
      },
      {
        $limit: pagesize
      }
    ])
    let results = {}
    results.result = result
    results.total = total
    res.send(results)
  })

  router.get('/question', async (req, res) => {
    const pagesize = Number(req.query.pagesize)
    const pagenum = Number(req.query.pagenum)
    const total = await model.find({ "category.value": "论坛提问" }).countDocuments()
    const result = await model.aggregate([
      {
        $match: { "category.value": "论坛提问" }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'writer',
          foreignField: '_id',
          as: 'writer'
        }
      },
      {
        $sort: { "time": -1 }
      },
      {
        $skip: pagesize * (pagenum - 1)
      },
      {
        $limit: pagesize
      }
    ])
    let results = {}
    results.result = result
    results.total = total
    res.send(results)
  })

  router.get('/hot', async (req, res) => {
    const pagesize = Number(req.query.pagesize)
    const pagenum = Number(req.query.pagenum)
    const total = await model.find().countDocuments()
    const result = await model.aggregate([
      {
        $match: {}
      },
      {
        $lookup: {
          from: 'users',
          localField: 'writer',
          foreignField: '_id',
          as: 'writer'
        }
      },
      {
        $sort: { "agree": -1 }
      },
      {
        $skip: pagesize * (pagenum - 1)
      },
      {
        $limit: pagesize
      }
    ])
    let results = {}
    results.result = result
    results.total = total
    res.send(results)
  })

  //首页创作数据get
  router.get('/writedata', async (req, res) => {
    let id;
    try {
      id = needToken(app, req.headers.authorization)
    } catch (error) {
      res.send({ sum: '暂无', length: '暂无' })
    }
    if (id) {
      const result = await modelUser.findById(id)
      let sum = 0//点赞数
      for (let i of result.article) {
        const result1 = await model.findById(i)
        if(result1.agree){
          sum += result1.agree
        }
        
      }
      let obj = {}
      obj.length = result.article.length//文章数
      obj.sum = sum
      // console.log(result)
      res.send(obj)

    }

  })


  //创作中心内容get
  router.get('/edit', async (req, res) => {
    const id = needToken(app, req.headers.authorization)
    const result = await modelUser.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) }
      },
      {
        $lookup: {
          from: 'articles',
          localField: 'article',
          foreignField: '_id',
          as: 'result'
        }
      },
    ])
    // console.log(result[0].result)
    res.send(result[0].result)
  })
  //收藏夹内容get
  router.get('/star', async (req, res) => {
    const id = needToken(app, req.headers.authorization)
    const result = await modelUser.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) }
      },
      {
        $lookup: {
          from: 'articles',
          localField: 'stars',
          foreignField: '_id',
          as: 'result'
        }
      },
    ])
    // console.log(result[0].result)
    res.send(result[0].result)
  })

  //文章内容get
  router.get('/article:id', async (req, res) => {
    // console.log(req.params)
    // const result = await model.findById(req.params.id)
    try {
      const result = await model.aggregate([
        {
          $match: { "_id": mongoose.Types.ObjectId(req.params.id) }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'writer',
            foreignField: '_id',
            as: 'writer'
          }
        },

      ])
      // console.log(result)
      result.map((el) => {
        el.writer = el.writer[0]
      })
      res.send(result[0])
    } catch (error) {
      assert(false, 402, "没有找到对应的文章哦")
      res.send('error')
    }

  })

  //修改文章内容get
  router.get('/edit:id', async (req, res) => {
    const id = needToken(app, req.headers.authorization)
    let result
    try {
      result = await model.findById(req.params.id, ["category", "title", "content", "icon", "writer"])
    } catch (error) {
      assert(result, 402, "没有找到对应的文章哦")
    }
    assert(id == result.writer, 402, "您不是这篇文章的作者，不能修改!")
    //  console.log(result)
    res.send(result)
  })
  //修改文章内容put获取管理员专用通道
  router.put('/edit:id', async (req, res) => {
    console.log(req.params)
    const id = needToken(app, req.headers.authorization)
    const result = await model.findById(req.params.id, ["category", "title", "content", "icon", "writer"])
     
    res.send(result)
    // assert(false,402,"没有找到对应的文章哦")
  })
  //修改文章内容提交post
  router.post('/edit:id', async (req, res) => {
    const id = needToken(app, req.headers.authorization)
    await model.findByIdAndUpdate(req.params.id, {
      $set: req.body
    })
    res.send('ok')
  })

  //删除文章delete
  router.delete('/edit:id', async (req, res) => {
    if(req.params.id=='5f38f9ef5c3c0312cc8d6a8d'){
      assert(false,422,'不准删除站长文章!')
    }
    const id = needToken(app, req.headers.authorization)
    await model.findOneAndRemove(req.params.id)
    await modelUser.updateMany({}, {
      $pull: { article: req.params.id, agreed: req.params.id, stars: req.params.id }
    })
    res.send('ok')
  })

  //添加点赞
  router.put('/agree', async (req, res) => {
    const id = needToken(app, req.headers.authorization)
    const result = await modelUser.updateOne({ _id: id },
      {
        $addToSet: {
          "agreed": req.body.id
        }
      })
    if (!result.nModified) {
      res.send('已经点赞过了')
    } else {
      await model.updateOne({ _id: req.body.id }, {
        $inc: {
          "agree": 1
        }
      })
      res.send('点赞成功')
    }
  })

  //添加收藏
  router.put('/star', async (req, res) => {
    const id = needToken(app, req.headers.authorization)
    const result = await modelUser.updateOne({ _id: id },
      {
        $addToSet: {
          "stars": req.body.id
        }
      })
    // console.log(result)
    if (result.nModified) {
      res.send('收藏成功')
    } else {
      res.send('已经收藏过了')
    }
  })
  //移除收藏
  router.delete('/star:id', async (req, res) => {
    const id = needToken(app, req.headers.authorization)
    // console.log(req.params.id)
    const result = await modelUser.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
      $pull: {
        "stars": mongoose.Types.ObjectId(req.params.id)
      }
    })
    if (result.nModified)
      res.send("ok")
    else {
      res.send("error")
    }
  })


  //delete 删除评论
  router.post('/commentdelete', async (req, res) => {
    const id = needToken(app, req.headers.authorization)
    assert(id == req.body.user, 401, '请先登录')
    // console.log(req.body)
    if (!req.body.children) {//父母节点评论删除
      const res2 = await model.updateOne({ _id: mongoose.Types.ObjectId(req.body.pid) }, {
        $pull: {
          "comment": { _id: mongoose.Types.ObjectId(req.body.id) }
        }
      });
      // console.log(res2)
    } else {
      const res1 = await model.updateOne({ 'comment.children._id': mongoose.Types.ObjectId(req.body.id) }, {
        $pull: {
          "comment.$.children": { _id: mongoose.Types.ObjectId(req.body.id) }
        }
      });
    }

    res.send('delete')
  })
  //put 评论回复
  router.put('/comment', async (req, res) => {
    const id = needToken(app, req.headers.authorization)
    // console.log(req.body)
    if (req.body.huifuobj.children) {
      await model.updateOne({ _id: req.body.commentTo },
        {
          $push: {
            [`comment.${req.body.huifuobj.index}.children`]: {
              "user": id,
              "content": req.body.content,
              "time": req.body.time
            }
          }
        })
    } else {
      await model.updateOne({ _id: req.body.commentTo },
        {
          $push: {
            "comment": {
              "user": id,
              "content": req.body.content,
              "time": req.body.time
            }
          }
        })
    }

    res.send(id)
  })

  router.post('/comment', async (req, res) => {//前端把文章的评论的数组传回来 
    // 前端的评论中只有user_id 需要找到评论人的名字和头像，但评论下面还有children评论，aggregate方法不好写
    //arr替换原数组,obj为arr的每一项,childrenobj为obj.children里的每一项
    let arr = [];
    for (let i of req.body) {
      let obj = {}
      // console.log(i)
      obj.content = i.content//文章内容复制
      obj.time = i.time
      obj.children = []
      obj.id = i._id
      // console.log("1",i)
      let result = await modelUser.findById(i.user, ["avatar", "userName"]);
      // console.log(result)
      obj.user = result
      for (let j in i.children) {
        let childrenobj = {}
        childrenobj.content = i.children[j].content
        childrenobj.time = i.children[j].time
        childrenobj.id = i.children[j]._id
        let childrenresult = await modelUser.findById(i.children[j].user, ["avatar", "userName"])
        // console.log('3',childrenresult)
        childrenobj.user = childrenresult
        // console.log('1',childrenobj)
        obj.children.push(childrenobj)
        // console.log('now',obj.children)
      }
      arr.push(obj)
      // console.log("2",obj)
    }
    // console.log(arr)
    res.send(arr)
  })
  
  
  app.use('/server/api', async (req, res, next) => {

    // const modelName = (req.params.resource)
    // req.Model = require(`../../modules/${modelName}`)
    // console.log('art 123')
    next()
  }, router)
}