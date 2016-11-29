import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';

class ProgressComponent extends React.Component {

  render() {
    return this.props.loading ? (<div className="progress-bar">

      <div className="text-count">
        Ищу совпадения песен  <span>{this.props.current + 1}</span>/<span>{this.props.all}</span>
      </div>
      <LinearProgress mode="determinate" min={0} max={this.props.all} value={this.props.current +1} />
    </div>) : null;
  }

}

export default connect(state => state.data)(ProgressComponent);
