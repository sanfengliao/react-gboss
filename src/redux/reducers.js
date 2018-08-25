import {combineReducers} from 'redux';

import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, USER_LIST, RECEIVE_MSG, MSG_READ, RECEIVE_MSG_LIST, } from "./actions-type"
import {getRedirectPath} from "../utils"

const initUser = {
    name:'',
    pwd:'',
    type:'',
    redirectTo:''
}
//管理user的resucer
function user(state = initUser, action) {
    //debugger
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...action.data, redirectTo:getRedirectPath(action.data)};
        case ERROR_MSG:
            return {...state, msg:action.data}
        case RECEIVE_USER:
            
            return action.data
        case RESET_USER:
            return {...initUser, msg:action.data}
        default:
            return state;
    }
}

const initUserList = []

function userList(state = initUserList, action) {
    switch (action.type) {
        case USER_LIST:
            return action.data
        default:
            return state;
    }
}

const initChat = {
    chatMsgs:[],
    user:{},
    unReadCount:0
}

function chat (state=initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            var {chatMsgs, users, userid} = action.data;
            return {
                chatMsgs,
                users,
                unReadCount:chatMsgs.reduce((preTotal, msg) => {
                    return !msg.read && msg.to === userid ? 1 : 0;
                }) 
            }
            
        case RECEIVE_MSG:
            var {chatMsg, userid} = action.data;
            return {
                chatMsgs:[...state.chatMsgs, chatMsg],
                users:state.users,
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === userid)
            }
        case MSG_READ:
            const {from, to, count} = action.data;
            return {
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from === from && msg.to == to) {
                        return {...msg, read:true}
                    }
                    return msg;
                }),
                users: state.users,
                unReadCount:state.unReadCount = count
            }
        default:
            return state;
    }
}

export default combineReducers({
    user,
    userList,
    chat
})