/*
用户列表的UI组件
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'

const Header = Card.Header
const Body = Card.Body

class UserList extends React.Component {
    static propTypes = {
        userList:PropTypes.array.isRequired
    }
    render() {
        return (
            <div style={{marginTop:50, marginBottom:50}}>
                <WingBlank>
                   { this.props.userList.map((user) => (
                        <div key={user._id}>
                            <WhiteSpace/>
                            <Card key={user._id}>
                                <Header
                                title={user.name}
                                thumb={user.avatar ? require(`../../assets/imgs/${user.avatar}.png`):null}
                                extra={<span>{user.title}</span>}
                                />
                                <Body>
                                {user.type === 'boss'? <div>公司: {user.company}</div>:null}
                                <div>描述:{user.desc}</div>
                                {user.type === 'boss'? <div>薪资: {user.money}</div>:null}
                                </Body>
                            </Card>
                        </div>
                    ))
                   }
                </WingBlank>
            </div>
        
        )
    }
}

export default UserList
