import React from 'react';
import debounce from 'lodash.debounce'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ApiClient from '../../utils/index';
import './_header.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSong } from '../../redux/modules/selection';
import { getPeople } from '../../redux/modules/data';


let client;

@connect(state => state,
  dispatch=> {
    client = new ApiClient(dispatch);
    return bindActionCreators({ addSong,getPeople }, dispatch);
  }
)
export default class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      dataSource: [],
      value:'',
      songField:'artist'
    };
    // this.debouncedGetSongs = debounce((value) => {
    //   client.getSongs(value).then(data => {
    //     this.setState({
    //       dataSource: data.map(song => `${song.artist} ${song.title}`),
    //     });
    //   });
    // }, 500);
  }

  getPeople(){
    client.getUsers().then(people => {
      client.getUsersSongs(people, this.props.selection.songs);
    });
  }


  login() {
    client.login();
  }

  handleSubmit(e) {
    e && e.preventDefault();
    //this.debouncedGetSongs(value);
    if(!!this.state.value.length){
      this.props.addSong({
        [this.state.songField]:this.state.value,
      });
      this.setState({
        value:'',
        valueError:''
      });
    }else{
      this.setState({
        valueError:'Введите больше одного символа',
      });
    }


  }
  handleSearchChange(e){
    this.setState({
      value:e.target.value,
    });
  }
  handleSongFieldChange(event, index, value){
    this.setState({
      songField:value,
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
                       className="search-field"
                       errorText={this.state.valueError}
            />
            <SelectField
              value={this.state.songField}
              onChange={::this.handleSongFieldChange}
              className="select-field"
            >
              <MenuItem value={'artist'} primaryText="Исполнитель" />
              <MenuItem value={'title'} primaryText="Песня" />
            </SelectField>
          </div>
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
        </form>
      </header>)
  }
}