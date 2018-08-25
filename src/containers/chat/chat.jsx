import React, {Component} from 'react'
import {NavBar, List, InputItem, Icon, Grid} from 'antd-mobile'
import {connect} from "react-redux"

import {sendMsg} from "../../redux/actions"

const Item = List.Item

class Chat extends Component {
    componentWillMount() {
        const emojis = ['😀', '😄', '😅', '😉','😀', '😄', '😅', '😉',
        '😀', '😄', '😅', '😉','😀', '😄', '😅', '😉',
        '😀', '😄', '😅', '😉','😀', '😄', '😅', '😉',
        '😀', '😄', '😅', '😉','😀', '😄', '😅', '😉',
        '😀', '😄', '😅', '😉','😀', '😄', '😅', '😉',
        '😀', '😄', '😅', '😉','😀', '😄', '😅', '😉',
        '😀', '😄', '😅', '😉','😀', '😄', '😅', '😉']
      this.emojis = emojis.map(text => ({text}))
    }
    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)
        this.props.readMsg(this.props.match.params.userid)
    }
    
    componentWillUnmount() {
        this.props.readMsg(this.props.match.params.userid)
    }
  
    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight)
    }
    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({isShow})
        if(isShow) {
          // 异步手动派发resize事件,解决表情列表显示的bug
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
          }, 0)
        }
      }
      
    state = {
        content:'',
        isShow:false
    }
    handleSubmit = () => {
        const content = this.state.content.trim()
        if(content) {
            const from = this.props.user._id
            const to = this.props.match.params.userid
            this.props.sendMsg({from, to, content})
            this.setState({content:''})
        }
    }
    render() {
        const {user} = this.props
        const {users, chatMsgs} = this.props.chat;
        if(!user._id && users.length) {
            return
        }
        const targetId = this.match.params.userid
        const meId = user._id
        const chat_id = [targetId, meId].sort().join("_")
        const msgs = chatMsgs.filter(msg => msg.chat_id === chat_id)
        const targetIcon = users[targetId] ? require(`../../assets/imgs/${users[targetId].avatar}.png`) : null;
        const meIcon = require(`../../assets/imgs/${user.avatar}.png`)
        return (
        <div id='chat-page'>
            <NavBar className='stick-top'
                icon={<Icon type="left"/>}
                onLeftClick={() => {this.props.history.goBack()}}
                >{users[targetId].name}</NavBar>
            <List style={{marginTop:50}}>
                {msgs.map((msg) => {
                    if(msg.to===meId) {
                        return <Item key={msg._id} thumb={targetIcon}>{msg.content}</Item>
                    }else {
                        return <Item key={msg._id} thumb={meIcon}>{msg.content}</Item>
                    }
                })}
            </List>

            <div className='am-tab-bar'>
                <InputItem
                    placeholder="请输入"
                    extra={
                        <div>
                            <span onClick={this.toggleShow}  style={{marginRight: 10}}>笑脸</span>
                            <span onClick={this.handleSubmit}>发送</span>
                        </div>
                    }
                    value={this.state.content}
                    onChange = {(val) => this.setState({content:val})}
                />
                {
                    this.state.isShow?<Grid data={this.emojis} columnNum={8} carouselMaxRow={4} isCarousel={true}></Grid> : null
                }
            </div>
        </div>
        )
    }
}



export default connect(
    state => ({
        user:state.user,
        chat:state.chat
    }),
    {}
)(Chat)