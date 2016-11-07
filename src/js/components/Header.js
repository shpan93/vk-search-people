import AutoComplete from 'material-ui/AutoComplete';

import RaisedButton from 'material-ui/RaisedButton';

import React from 'react';
import debounce from 'lodash.debounce'

function getSongs(value) {
    return new Promise((resolve, reject)=> {
        VK.Api.call('audio.search', {
            q: value
        }, (r) => {
            if (r.error) {
                reject(r.error);
            }
            resolve(r.response);
        });
    })
}
function login() {
    return new Promise((resolve, reject)=> {
        VK.Auth.login((r) => {
            if (r.error) {
                reject(r.error);
            }
            resolve(r.response);
        }, VK.access.AUDIO, VK.access.FRIENDS);
    })
}

export default class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            dataSource: [],
        }
    }

    login(){
        login();
    }

    handleUpdate(value) {

        debounce( (value) => {

            getSongs(value).then(data => {
                console.log(data);
                this.setState({
                    dataSource: data.map(song => `${song.artist} ${song.title}`),
                });
            });
        }, 500);


    }

    render() {
        return (
            <div>
                <AutoComplete dataSource={this.state.dataSource} onUpdateInput={::this.handleUpdate} name="search"/>
                <div className="login">
                    <h3>Login</h3>
                    <RaisedButton onClick={::this.login}
                                  primary={true}
                                  label="Login"/>
                </div>
            </div>)
    }
}