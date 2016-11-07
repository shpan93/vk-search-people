import React, {Component} from 'react';
import Header from '../components/Header'
export default class Root extends Component {
    render() {
        return (
            <div className="root">
                <Header></Header>
                <div className="view  ">
                    {this.props.children}
                </div>
                <div>sidebar</div>
            </div>
        );
    }
};