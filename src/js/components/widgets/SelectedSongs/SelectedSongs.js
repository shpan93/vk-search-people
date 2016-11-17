import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Widget from '../../Widget/Widget'
import { removeSong } from '../../../redux/modules/selection';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';

@connect(state => state.selection,
  dispatch=> bindActionCreators({ removeSong }, dispatch)
)
export default class SelectedSongs extends React.Component {
  static propTypes = {
    songs: React.PropTypes.array,
  };

  render() {
    return (
      <Widget title="SelectedSongs ">
        <ul>
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
              <FloatingActionButton mini={true} className="delete" onClick={this.props.removeSong.bind(this,i)}>
                <ContentRemove />
              </FloatingActionButton>
            </li>
          ))}
        </ul>
      </Widget>
    );
  }
}
