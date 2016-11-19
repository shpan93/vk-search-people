import React, {Component} from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar';


export default class Root extends Component {
    render() {
        return (
            <div className="root">

                <div className="view  ">
                  <Header></Header>
                    {this.props.children}
                </div>
              <Sidebar></Sidebar>

            </div>
        );
    }
};