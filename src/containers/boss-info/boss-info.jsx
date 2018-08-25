import React, { Component } from "react";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"

import AvatarSelector from "../../components/avatar-selector/avatar-selector"
import {updateUser} from "../../redux/actions"

class BossInfo extends Component {
    
    state = {
        // 头像
        avatar: '',
        // 个人简介或者职位简介
        desc: '',
        // 职位名
        title: '',
        // 公司名称
        company: '',
        // 工资
        money: ''
    }
    handleChange = (name, val) => {
        this.setState({[name]:val});
    }
    setAvatar = (avatar) => {
        this.setState({avatar})
    }

    save = () => {
       
        this.props.updateUser(this.state)
    }
    render() {
        const {avatar} = this.props.user;
        if(avatar) {
            return <Redirect to="/boss"/>
        }
        return (
            <div>
                <NavBar>Boss信息完善</NavBar>
                <AvatarSelector selectAvatar={this.setAvatar}></AvatarSelector>
                <InputItem onChange={val => {this.handleChange('title', val)}}>招聘职位:</InputItem>
                <InputItem onChange={val => {this.handleChange('company', val)}}>公司名称:</InputItem>
                <InputItem onChange={val => {this.handleChange('money', val)}}>职位薪资:</InputItem>
                <TextareaItem title="职位要求" rows={3} onChange={val => {this.handleChange('desc', val)}}></TextareaItem>
                <Button type="primary" onClick={this.save}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {updateUser}
)(BossInfo)