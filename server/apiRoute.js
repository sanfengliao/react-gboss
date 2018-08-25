/*
后台应用的路由器模块
1. 引入express
2. 得到路由器
3. 注册n个路由
4. 向外暴露路由器
5. 通过 app使用上路由器
 */


const express = require("express");
const models = require("./model");
const md5 = require("blueimp-md5")


const UserModel = models.getModel("user");
const ChatModel = models.getModel("chat")
const router = express.Router();
const _filter = {pwd: 0, __v: 0}; // 过滤掉不需要的数据

router.post("/register", function (req, res) {
    const {name, pwd, type} = req.body;
    UserModel.findOne({name}, function (err, user) {
        if(user) {
           return res.send({code:1, msg:"该用户名已被注册"})
        }
        
        const _user = new UserModel({name, pwd: md5(pwd), type})
        _user.save(function(err, user) {
            res.cookie('userid', user._id, {maxAge:1000*60*60*7});
            res.send({code: 0,data:{ _id: user._id, name, pwd, type}});
        })
    })
})

router.post("/login", function(req, res) {
    const {name, pwd} = req.body;

    UserModel.findOne({name, pwd:md5(pwd)},_filter, function(err, user) {
        if(!user) {
            res.json({code:1, "msg":"用户名或密码不正确"});
        } else {
            res.cookie('userid', user._id, {maxAge:1000*60*60*7});
            res.jsonp({code:0, data:user});
        }
    })
})

router.post("/update", function (req, res) {
    const user_id = req.cookies.userid

    if(!user_id) {
        return res.send({code:1, "msg":"请先登录"})
    }
    UserModel.findByIdAndUpdate({_id:user_id}, req.body, function(err, user) {
        if(!user) {
            res.clearCookie("userid");
            res.send({code:1, msg:"请先登录"})
        }else {
            const {_id, name, type} = user;
            user = Object.assign({}, req.body, {name, _id, type});
            res.send({code:0, data:user});
        }   
    })
})

router.get("/user", function(req, res) {
    const userid = req.cookies.userid;
    if(!userid) {
        return res.json({code:1, msg:"请先登录"});
    }
    UserModel.findOne({_id:userid}, function(err, user) {
        if(err) {
            res.clearCookie("userid");
            res.json({code:1, msg:"请先登录"});
        } else {
            res.json({code:0, data:user})
        }
    })
})

router.get("/list", function(req, res) {
    const {type} = req.query
    UserModel.find({type}, _filter, function (err, users) {
        if(users) {
            res.json({code:0, data: users})
        }
    })
})

router.get("/msglist", function (req, res) {
    const userid = req.cookies.userid;
    UserModel.find(function(err, userDocs){
        const users = {}
        userDocs.forEach(doc => {
            users[doc._id]  = {name: doc.name, avatar:doc.avatar}
        })
        ChatModel.find({"$or":[{from:userid}, {to:userid}]}, _filter, function (err, chatMsgs) {
            res.send({code:0, data:{users, chatMsgs}});
        })
    })
})

router.post("/readMsg", function(req, res) {
    const from = req.body.from
    const to = req.cookies.userid
    ChatModel.update({from, to, read:false}, {read:true}, {multi:true}, function (err, doc) {
        console.log(doc)
        res.send({code:0, data:doc.nModified});
    })
})

module.exports = router;