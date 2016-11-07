import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Widget from '../../Widget/Widget'
import { addSong } from '../../../redux/modules/selection';

@connect(state => state.selection,
  dispatch=> bindActionCreators({ addSong }, dispatch)
)
export default class SelectedSongs extends React.Component {
  static propTypes = {
    songs:React.PropTypes.array,
  };

  render() {
    return (
      <Widget title="SelectedSongs ">
        <ul>
          {this.props.songs.length > 0 && this.props.songs.map((song, i)=> <li key={i}>{song}</li>)}
        </ul>
      </Widget>
    );
  }
}
