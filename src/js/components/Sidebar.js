import React, { Component } from 'react';
import { connect } from 'react-redux';


import SelectedSongs from '../components/widgets/SelectedSongs/SelectedSongs'
import Dialog from '../components/widgets/Dialog/Dialog'

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
    <Dialog>

    </Dialog>


  </aside>
);

export default connect(state => state.data)(Sidebar);
