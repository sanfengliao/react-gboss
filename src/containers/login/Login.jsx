import React, { Component } from 'react';
import {connect} from "react-redux"
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Button} from "antd-mobile"
import {Redirect} from "react-router-dom"

import Logo from "../../components/logo/logo"
import {login} from "../../redux/actions"

class Login extends Component {
    state = {
        name:'',
        pwd: '',
    }
    handleLogin = () => {
        this.props.login(this.state)
    }
    goRegister = () => {
        this.props.history.replace("/register")
    }
    render() {
        const {user} =this.props;
        if(user.redirectTo) {
            
            return <Redirect to = {user.redirectTo}/>
        }
        return (
            <div>
                <NavBar>硅 谷 直 聘</NavBar>
                <Logo />
                <WingBlank>
                    <p className="error-msg">{user.msg?user.msg:"请先登录"}</p>
                    <List>
                        <InputItem onChange={(val) => {this.setState({name:val})}}>用户名:</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem type="password" onChange={(val) => {this.setState({pwd:val})}}>密码:</InputItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.handleLogin}>登录</Button>
                        <WhiteSpace />
                        <Button onClick={this.goRegister}>还没有账号</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {login}
)(Login)