import React, { Component } from 'react';
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import {connect} from "react-redux"
import {Redirect} from "react-dom"

import AvatarSelector from "../../components/avatar-selector/avatar-selector"
import {updateUser} from "../../redux/actions"

class GeniusInfo extends Component {
    
    state = {
        // 头像
        avatar: '',
        // 个人简介或者职位简介
        desc: '',
        // 职位名
        title: '',
       
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
            console.log(avatar)
            return <Redirect to="/genius" />
        }
        return (
            <div>
                <NavBar>牛人信息完善</NavBar>
                <AvatarSelector selectAvatar={this.setAvatar}></AvatarSelector>
                <InputItem onChange={val => {this.handleChange('title', val)}}>求职岗位:</InputItem>
               
                <TextareaItem title="个人简介" rows={3} onChange={val => {this.handleChange('desc', val)}}></TextareaItem>
                <Button type="primary" onClick={this.save}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {updateUser}
)(GeniusInfo)