import React, { Component } from "react"
import {connect} from "react-redux"

import UserList from "../../components/user-list/user-list"
import {getUserList} from "../../redux/actions"

class Genius extends Component {
    componentWillMount() {
        this.props.getUserList('boss')
    }
    render() {
        //console.log(1)
        return (
            <div>
                <UserList userList={this.props.userList}/>
            </div>
        )
    }
}

export default connect(
    state => ({userList:state.userList}),
    {getUserList}
)(Genius)