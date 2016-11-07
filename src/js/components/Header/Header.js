import React from 'react';
import debounce from 'lodash.debounce'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ApiClient from '../../utils/index';
import './_header.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSong } from '../../redux/modules/selection';
import { getPeople } from '../../redux/modules/data';


const client = new ApiClient();

@connect(state => state,
  dispatch=> bindActionCreators({ addSong,getPeople }, dispatch)
)
export default class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      dataSource: [],
      value:'',
    }
    this.debouncedGetSongs = debounce((value) => {
      client.getSongs(value).then(data => {
        this.setState({
          dataSource: data.map(song => `${song.artist} ${song.title}`),
        });
      });
    }, 500);
  }

  login() {
    client.login();
  }

  handleSubmit(e) {
    e && e.preventDefault();
    //this.debouncedGetSongs(value);
    this.props.addSong(this.state.value);
    this.setState({
      value:'',
    });

  }
  handleSearchChange(e){
    this.setState({
      value:e.target.value,
    });
  }
  render() {
    return (
      <header className="header row">
        <form noValidate onSubmit={::this.handleSubmit}>


          <div className="search item">
            <TextField name="search" fullWidth={true}
                       onChange={::this.handleSearchChange}
                       placeholder="Введите название трека" autoComplete="off"
              value={this.state.value}
            />
          </div>
          <div className="button item">
            <RaisedButton
              secondary={true}
              label="Поиск"
              onClick={::this.props.getPeople}
            />
            <RaisedButton
              primary={true}
              label="Login"
              onClick={::this.login}
            />
          </div>
        </form>
      </header>)
  }
}