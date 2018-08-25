import React, { Component } from "react"
import {connect} from "react-redux"

import UserList from "../../components/user-list/user-list"
import {getUserList} from "../../redux/actions"

class Boss extends Component {
    componentWillMount() {
        this.props.getUserList('genius')
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
)(Boss)