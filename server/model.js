//连接数据库
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/gboss");
const conn = mongoose.connection;
conn.on("connected", function () {
    console.log("数据库连接成功")
})

//定义schema
const userSchema = mongoose.Schema({
    // 用户名
  'name': {type: String, required: true},
  // 密码
  'pwd': {type: String, required: true},
  // 类型
  'type': {'type': String, required: true},
  // 头像
  'avatar': {'type': String},
  // 个人简介或者职位简介
  'desc': {'type': String},
  // 职位名
  'title': {'type': String},
  // 如果你是boss 还有两个字段
  // 公司名称
  'company': {'type': String},
  // 工资
  'money': {'type': String}

})

mongoose.model("user", userSchema);

// 定义chats集合的文档结构
const chatSchema = mongoose.Schema({
  from: {type: String, required: true}, // 发送用户的id
  to: {type: String, required: true}, // 接收用户的id
  chat_id: {type: String, required: true}, // from_to组成字符串
  content: {type: String, required: true}, // 内容
  read: {type:Boolean, default: false}, // 标识是否已读
  create_time: {type: Number} // 创建时间
})
// 定义能操作chats集合数据的Model
mongoose.model('chat', chatSchema)


module.exports = {
    getModel(name) {
        return mongoose.model(name);
    }
}