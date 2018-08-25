/* logo 组件 */
import React, { Component } from 'react';

import logo from "./job.png";
import "./logo.less";

export default class Logo extends Component {
    render() {
        return (
            <div className="logo-container">
                <img src={logo} alt="logo" />
            </div>
        )
    }
}