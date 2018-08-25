import React, {Component} from "react";
import {connect} from "react-redux"
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button} from "antd-mobile"
import {Redirect} from "react-router-dom"

import Logo from "../../components/logo/logo"
import {register} from "../../redux/actions"

const RadioItem = Radio.RadioItem

class Register extends Component {
    state = {
        name:'',
        pwd: '',
        pwd2: '',
        type: 'boss'
    }
    handleSubmit = () => {
        this.props.register(this.state)
    }
    goLogin = () => {
        this.props.history.replace("/login")
    }
    render() {
        const {user} = this.props;
        if(user.redirectTo) {
            
            return <Redirect to = {user.redirectTo}/>
        }
        return (
            <div>
                <NavBar>硅 谷 直 聘</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        {user.msg ? <p className="error-msg">{user.msg}</p> : ''}
                        <InputItem onChange={(val) => {this.setState({name:val})}}>用户名:</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem type="password" onChange={(val) => {this.setState({pwd:val})}}>密码:</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange={(val) => {this.setState({pwd2:val})}}>确认密码:</InputItem>
                        <WhiteSpace />
                        <RadioItem checked={this.state.type === 'boss'} onChange={(val) => {this.setState({type:'boss'})}}>Boss</RadioItem>
                        <RadioItem checked={this.state.type === 'genius'} onChange={(val) => {this.setState({type:'genius'})}}>牛人</RadioItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.handleSubmit}>注 册</Button>
                        <WhiteSpace />
                        <Button onClick={this.goLogin}>已经有账号</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)