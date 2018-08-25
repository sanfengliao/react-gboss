import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import {Provider} from "react-redux"


import store from "./redux/store"
import Login from "./containers/login/Login"
import Register from "./containers/register/Register"
import Dashboard from "./containers/dashboard/Dashboard"
import "./assets/css/index.less"

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/" component={Dashboard}/>
            </Switch>
        </BrowserRouter>
    </Provider>

), document.getElementById("root"))