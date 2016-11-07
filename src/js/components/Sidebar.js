import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { AddTask, CurrentSelection, SearchWidget } from './index';
import SelectedSongs from '../components/widgets/SelectedSongs/SelectedSongs'
const Sidebar = (props) => (
  <aside className="sidebar ">
    <div className="selection">
      Текущие фильтры:
      <ul>
        <li></li>
      </ul>
    </div>

    <SelectedSongs>

    </SelectedSongs>

  </aside>
);

export default connect(state => state.data)(Sidebar);
