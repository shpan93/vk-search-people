import React, { Component } from 'react';
import { connect } from 'react-redux';


import SelectedSongs from '../components/widgets/SelectedSongs/SelectedSongs'
import Dialog from '../components/widgets/Dialog/Dialog'
import Filters from '../components/widgets/Filters/Filters'

const Sidebar = (props) => (
  <aside className="sidebar ">
    <Filters />
    <SelectedSongs />
    <Dialog />
  </aside>
);

export default connect(state => state.data)(Sidebar);
