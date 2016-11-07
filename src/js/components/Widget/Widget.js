import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import './_widget.scss';
class Widget extends Component {

    static propTypes = {
        title:React.PropTypes.string,
        children:React.PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            expanded: true
        }
    }

    render() {

        return (

            <div className="widget search-widget">
                <h6>{this.props.title}

                    <div className="btn-wr">
                        <IconButton onClick={()=>{this.setState({expanded: !this.state.expanded})}}>

                            {this.state.expanded ? (
                                <ArrowUp ></ArrowUp>

                            ) : (
                                <ArrowDown ></ArrowDown>
                            )}

                        </IconButton>

                    </div>
                </h6>
                <div className="widget-wr" data-expanded={this.state.expanded}>
                    {this.props.children}
                </div>
            </div>



        );
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export default Widget;