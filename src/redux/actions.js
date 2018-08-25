import io from "socket.io-client"

import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, USER_LIST, RECEIVE_MSG, MSG_READ, RECEIVE_MSG_LIST} from "./actions-type";
import {reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserList, reqReadMsg, reqChatList} from "../api"

const errorMsg = (msg) => ({type:ERROR_MSG, data:msg});
const authSuccess = (user) => ({type:AUTH_SUCCESS, data: user})
const receiveUser = (user) => ({type:RECEIVE_USER, data: user})
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
const receiverUserList = (userList) => ({type:USER_LIST, data:userList})

const receiveMsg = (chatMsg, userid) => ({type:RECEIVE_MSG, data: {chatMsg, userid}})
// 接收消息列表的同步action
const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userid}})

// 读取了消息的同步action
const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}})

const initIO = (dispatch, userid) => {
    io.socket = io(`ws://localhost:4000?userid=${userid}`)
    io.socket.on("receiveMsg", (chatMsg) => {
        console.log("浏览器接收到了消息", chatMsg)
        dispatch(receiveMsg(chatMsg, userid))
    })
}

export function register({name, pwd, pwd2, type}) {
    if (!name || !pwd  || !type) {
        return errorMsg("用户名密码必须输入");
    }
    if(pwd !== pwd2) {
        return errorMsg("两次密码必须相同");
    }

    return dispatch => {
        reqRegister({name, pwd, type}).then((response) => {
            const result = response.data;
            if (result.code === 0) {
                dispatch(authSuccess(result.data));
            }
            else {
                dispatch(errorMsg(result.msg));
            }
        })
    }
}

export function login({name, pwd}) {
    if(!name || !pwd) {
        return errorMsg("用户名密码必须输入");
    }
    return async dispatch => {
        const response = await reqLogin({name, pwd});
        const result = response.data;
        if (result.code === 0) {
            dispatch(authSuccess(result.data))
        }
        else {
            dispatch(errorMsg(result.msg));
        }
    }
    
}

export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user);
        const result = response.data;
        if(result.code === 0) {
            dispatch(receiveUser(result.data));
        }else {
            dispatch(resetUser(result.msg));
        }
    }
}

export const getUser = () => {
    return async dispatch => {
        const response = await reqUser();
        const result = response.data;
        if(result.code === 0) {
            dispatch(receiveUser(result.data));
        } else {
            dispatch(resetUser(result.msg));
        }
    }
}

export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiverUserList(result.data))
        }
    }
}

const getMsgList  = async (dispatch, userid) => {
    const response = await reqChatList()
    const result = response.data;
    if (result.code === 0) {
        const {chatMsgs, users} = result.data
        dispatch(receiveMsgList({chatMsgs, users, userid}))
    }
}

export const sendMsg = ({from, to, content}) => {
    return dispatch => {
        console.log("客户端向服务端发送消息", {from, to, content})
        io.emit("sendMsg", {from, to, content})
    }
}

export const readMsg = (userid) => {
    return async (dispatch, getState) => {
        const response = await reqReadMsg(userid);
        const result = response.data;
        if(result.code === 0) {
            const count = result.data;
            const from = userid;
            const to = getState().user._id
            dispatch(msgRead({from, to, count}))
        }
    }
}

