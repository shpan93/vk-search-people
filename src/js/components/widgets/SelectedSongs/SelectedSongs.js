import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Widget from '../../Widget/Widget'
import { removeSong,addSong } from '../../../redux/modules/selection';
import IconButton from 'material-ui/IconButton';
import ContentRemove from 'material-ui/svg-icons/navigation/close';
import debounce from 'lodash.debounce'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import './_SelectedSongs.scss';
@connect(state => state.selection,
  dispatch=> bindActionCreators({ removeSong,addSong }, dispatch)
)
export default class SelectedSongs extends React.Component {
  static propTypes = {
    songs: React.PropTypes.array,
  };
  constructor() {
    super();
    this.state = {
      value:'',
      songField:'artist'
    };
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
  render() {
    return (
      <Widget title="Параметры аудио " >
        <form noValidate onSubmit={::this.handleSubmit}>


          <div className="search item">
            <TextField name="search"
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
            <RaisedButton
              secondary={true}
              label="Добавить"
              onClick={::this.handleSubmit}
              disabled={this.state.valueError || this.state.value.length == 0}
            />
          </div>

        </form>
        <ul className="songs-list">
          {this.props.songs.length > 0 && this.props.songs.map((song, i)=>(
            <li
              key={i}>
            <span className="key">
              {song.title ? 'Песня' : 'Исполнитель'}
              <b>: </b>
            </span>
              <span className="value">
                {song.title || song.artist}
              </span>
              <IconButton style={{color:'red'}}  className="delete" onClick={this.props.removeSong.bind(this,i)}>
                <ContentRemove />
              </IconButton >
            </li>
          ))}
        </ul>
      </Widget>
    );
  }
}
