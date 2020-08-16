const jwt = require('jsonwebtoken')
const assert = require('http-assert')
module.exports = (app,tokenText) => {
  // console.log('token in')
  const token = String(tokenText)
  //没有token
  assert(token, 401, '请先登录')
  const { id } = jwt.verify(token, app.get('secret'))
  //此token不存在
  assert(id, 401, '请先登录')
  return id
}
