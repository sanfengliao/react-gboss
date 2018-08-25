import React, { Component } from 'react';
import { List, Grid } from "antd-mobile";
import PropTypes from "prop-types"

export default class AvatarSelector extends Component {
    static propTypes = {
        selectAvatar:PropTypes.func.isRequired
    }
    state = {
        icon:null,
        text:''
    }
    componentWillMount() {
        this.avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
        .split(',')
        .map(text => ({
          icon: require(`../../assets/imgs/${text}.png`),
          text
        }))  
    }

    render() {
        
        const gridHeader = this.state.icon ? (<div>
             <span>已选择头像: </span>
            <img style={{width: 20}} src={this.state.icon} alt="avatar"/>

        </div>):"请选择头像"
        return (
            <div>
                <List
                    renderHeader = {gridHeader}
                >
                    <Grid data={this.avatarList} columnNum={5} onClick={item => {
                        this.setState(item)
                        this.props.selectAvatar(item.text)
                    }}/>
                </List>
            </div>
        )
    }
}