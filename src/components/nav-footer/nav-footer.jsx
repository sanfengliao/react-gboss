import React, { Component } from 'react';
import PropTypes from "prop-types"
import {TabBar} from "antd-mobile"
import {withRouter} from "react-router-dom"

const Item = TabBar.Item

class NavFooter extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }
    render() {
        const navList = this.props.navList.filter(v => !v.hide)
        const {pathname} = this.props.location
        return (
            <TabBar>
                {
                    navList.map((v) => (
                        <Item
                            key={v.path}
                            title={v.text}
                            badge={v.path === '/msg' ? this.props.unReadCount : 0}
                            icon={{uri:require(`./imgs/${v.icon}.png`)}}
                            selectedIcon={{uri:require(`./imgs/${v.icon}-active.png`)}}
                            selected={pathname===v.path}
                            onPress={() => {this.props.history.replace(v.path)}}
                        ></Item>
                    ))
                }
            </TabBar>
        )
    }
}

export default withRouter(NavFooter)