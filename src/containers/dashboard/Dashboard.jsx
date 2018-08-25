import React, { Component } from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import cookies from "browser-cookies"
import {connect} from "react-redux"

import BossInfo from "../boss-info/boss-info"
import GeniusInfo from "../genius-info/genius-info"
import Boss from "../boss/boss"
import Genius from "../genius/genius"
import Msg from "../msg/msg"
import NotFound from "../../components/not-found/not-found"
import NavFooter from "../../components/nav-footer/nav-footer"
import User from "../user/user"
import Chat from "../chat/chat"
import {getUser} from "../../redux/actions"
import {getRedirectPath} from "../../utils"
import { NavBar } from "antd-mobile";


class Dashboard extends Component {
    // 给组件对象添加navList属性: this.navList获取
  navList = [
    {
      path: '/boss', // 路由路径
      component: Boss,
      title: '牛人列表',
      icon: 'boss',
      text: '牛人',
    },
    {
      path: '/genius', // 路由路径
      component: Genius,
      title: 'BOSS列表',
      icon: 'job',
      text: 'BOSS',
    },
    {
      path: '/msg', // 路由路径
      component: Msg,
      title: '消息列表',
      icon: 'msg',
      text: '消息',
    },
    {
      path: '/user', // 路由路径
      component: User,
      title: '个人中心',
      icon: 'user',
      text: '我',
    }
  ]

    componentDidMount() {
        const userid = cookies.get('userid');
        const {user} = this.props
        if(userid && !user._id) {
            this.props.getUser();
        }
    }
    
    render() {
        const userid = cookies.get("userid");
        if(!userid) {
            this.props.history.replace('/login');
            return null;
        }
        const {user} = this.props
        if(!user._id) {
            return null;
        } else {
            if(this.props.location.pathname === '/') {
                const path = getRedirectPath(user.type, user.avatar);
                return <Redirect to={path} />
            }
            if (user.type === 'boss') {
                this.navList[1].hide = true;
            }
            else {
                this.navList[0].hide = true;
            }
        }
        const currentNav = this.navList.find(nav => nav.path === this.props.location.pathname)
        return (
            <div>
                {currentNav ? <NavBar className="stick-top">{currentNav.title}</NavBar>:null}
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}/>
                    <Route path="/geniusinfo" component={GeniusInfo}/>
                    <Route path="/boss" component={Boss}/>
                    <Route path="/genius" component={Genius}/>
                    <Route path="/msg" component={Msg}/>
                    <Route path="/user" component={User}/>
                    <Route path='/chat/:userid' component={Chat}></Route>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter navList={this.navList} unReadCount={this.props.unReadCount}></NavFooter>:null}
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user, unReadCount: state.chat.unReadCount}),
    {getUser}
)(Dashboard)