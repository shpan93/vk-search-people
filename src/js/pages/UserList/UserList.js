import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './_userlist.scss'

@connect(state => state.data)
export default class UserList extends React.Component {
  // constructor(props){
  //
  // }

  renderList() {
    return this.props.users.map((user, i) => {
      if(typeof user !== 'object') return;
      return <div key={i} className="user">
        <a target="_blank" href={`https://vk.com/${user.domain}`}>
        <div className="img-wr">
          <img src={user.photo_200 || user.photo} alt="" />
        </div>
        <p>
          {user.first_name} <br />
          {user.last_name}
        </p>
          <div className="overlay">
            <ul>
              {user.matchedSongs.map((song, i )=> (
                <li>
                  <b>{song.artist}:</b> <span>{song.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </a>
      </div>
    });
  }

  render() {
    return (<div className="user-list" >
      {this.props.loaded ? this.renderList() : null}
    </div>);
    // return <User img={user.img} name={user.name} />
  };
}