/*
测试使用mongoose操作mongodb数据库的模块
1. 连接数据库
  1.1. 引入mongoose
  1.2. 连接指定数据库(URL只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)
2. 得到对应特定集合的Model
  2.1. 字义Schema(描述文档结构)
  2.2. 定义Model(与集合对应, 可以操作集合)
3. 通过Model或其实例对集合数据进行CRUD操作
  3.1. 通过Model实例的save()添加数据
  3.2. 通过Model的find()/findOne()查询多个或一个数据
  3.3. 通过Model的findByIdAndUpdate()更新某个数据
  3.4. 通过Model的remove()删除匹配的数据
 */

 //连接数据库
 const mongoose = require("mongoose");
 mongoose.connect("mongodb://localhost:27017/gboss_test");
 const conn = mongoose.connection;
 conn.on("connected", function () {
     console.log("数据连接成功")
 })

 // 定义Schema
 const schema = mongoose.Schema({
    'name': {type: String, 'required': true},
    // 密码
    'pwd': {type: String, 'required': true},
    // 类型
    'type': {'type': String, 'required': true},
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

 // 定义Model
 const UserModel = mongoose.model("user", schema);
 
 function testSave() {
    const user = new UserModel({
        name:'jack',
        pwd:'123',
        type:'genius',
        avatar:'boy'
    })
    user.save(function (err, user) {
        console.log("sava方法", err, user)
        
    })
 }

 function testFind() {
     UserModel.find(function (err, userList){
         console.log("testFind方法", err, userList);
     })
 }

function testUpdate() {
    UserModel.update({name:'jack'}, {name: 'bob'}, function (err, result) {
        console.log(err, result)
    })
}

 //testSave();
 //testFind();

//testUpdate();