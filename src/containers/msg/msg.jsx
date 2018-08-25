/*
对话消息列表组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

function getLastMsg(chatMsgs, userid) {
  const lastMsgsObj = {}
  chatMsgs.forEach(msg => {
    msg.unReadCount = 0;
    const chatId = msg.chat_id
    const lastMsg = lastMsgsObj[chatId]
    if(!lastMsg) {
      lastMsgsObj[chatId] = msg
      if(!msg.read && userid === msg.to) {
        msg.unReadCount = 1
      }
    }
    else {
      if (msg.create_time>lastMsg.create_time) {
        lastMsgsObj[chatId] = msg
        // 将原有保存的未读数量保存到新的lastMsg
        msg.unReadCount = lastMsg.unReadCount
      }
      // 别人发给我的未读消息
      if(!msg.read && userid===msg.to) {
        // 指定msg上的未读数量为1
        msg.unReadCount++
      }

    }
  });
  const lastMsgs = Object.values(lastMsgsObj)
  lastMsgs.sort(function(msg1, msg2)  {
    return msg2.create_time = msg1.create_time
  })

  return lastMsgs
}

class Msg extends Component {

  render() {
   // 得到props中的user和chat
   const {user, chat} = this.props
   // 得到当前用户的id
   const meId = user._id
   // 得到所用用户的集合对象users和所有聊天的数组
   const {users, chatMsgs} = chat
   // 得到所有聊天的最后消息的数组
   const lastMsgs = getLastMsgs(chatMsgs, meId)
   return (
     <List>
       {
         lastMsgs.map(msg => {
           const targetId = msg.from === meId ? msg.to : msg.from
           const targetUser = users[targetId]
           const avatarImg = targetUser.avatar ? require(`../../assets/imgs/${targetUser.avatar}.png`) : null

           return (
             <Item
               key={msg._id}
               extra={<Badge text={msg.unReadCount}/>}
               thumb={avatarImg}
               arrow='horizontal'
               onClick={() => this.props.history.push(`/chat/${targetId}`)}
             >
               {msg.content}
               <Brief>{targetUser.name}</Brief>
             </Item>
           )
         })
       }
     </List>
   )

  }
}

export default connect(
  state => ({user:state.user, chat:state.chat})
)(Msg)
