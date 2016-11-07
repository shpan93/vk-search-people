import React, {Component} from 'react';

export  default  class DisplayHeader extends Component{
	handleUpdatePeriod(update) {
		this.props.updateAction(update);
	}

	render(){
		return (

				<div className="display-header mdl-layout__header-row mdl-shadow--1dp">

						<button className="left mdl-button mdl-js-button mdl-button--icon" onClick={this.handleUpdatePeriod.bind(this, -1)}>
							<i className="fa fa-arrow-circle-left"></i>
						</button>
						<h2>{this.props.caption}</h2>
						<button className="right mdl-button mdl-js-button mdl-button--icon" onClick={this.handleUpdatePeriod.bind(this, 1)}>
							<i className="fa fa-arrow-circle-right"></i>
						</button>
									
				</div>
		)
	} 
};
