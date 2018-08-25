/*
用户个人中心路由组件
 */

import React from 'react'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
import {connect} from "react-redux"
import browserCookies from 'browser-cookies'

import {resetUser} from "../../redux/actions"

const Item = List.Item
const Brief = Item.Brief

class User extends React.Component {
    logout = () => {
        Modal.alert("注销","确认退出登录吗",[
            {
                text:"取消", 
                onPress:() => {}
            },
            {
                text:"确定",
                onPress:() => {
                    browserCookies.erase("userid")
                    this.props.resetUser()
                }
            }
        ])
    }
    render() {
        const {name, avatar, type, title, desc, money, company} = this.props
        return (
        <div style={{marginTop:50}}>
            <Result
            img={<img src={require(`../../assets/imgs/${avatar}.png`)} style={{width: 50}} alt="avatar"/>}
            title={name}
            message={type==='boss'? company:null}
            />

            <List renderHeader={() => '相关信息'}>
            <Item multipleLine>
                <Brief>职位: {title}</Brief>
                <Brief>简介: {desc}</Brief>
                {money ? <Brief>薪资: {money}</Brief>:null}
            </Item>
            </List>
            <WhiteSpace/>
            <List>
            <Item onClick={this.logout}>退出登录</Item>
            </List>
        </div>
        )
    }
}

export default connect(
    state => state.user,
    {resetUser}
)(User)
