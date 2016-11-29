import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import Progress from '../../components/widgets/Progress/Progress'
import ApiClient from '../../utils/index';
import './_header.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPeople } from '../../redux/modules/data';


let client;

@connect(state => state,
  dispatch=> {
    client = new ApiClient(dispatch);
    return bindActionCreators({ getPeople }, dispatch);
  }
)
export default class Header extends React.Component {



  getPeople(){
    client.getUsers(this.props.selection.filters).then(people => {
      client.getUsersSongs(people, this.props.selection.songs);
    });
  }


  login() {
    client.login();
  }



  render() {
    return (
      <div>
      <header className="header row">

          <div className="button item">
            <RaisedButton
              secondary={true}
              label="Поиск"
              onClick={::this.getPeople}
            />
            <RaisedButton
              primary={true}
              label="Login"
              onClick={::this.login}
            />
          </div>
      </header>

      <Progress />
        </div>
    )
  }
}