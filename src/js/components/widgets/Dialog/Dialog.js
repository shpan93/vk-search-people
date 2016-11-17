import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import TextField from 'material-ui/TextField';
import { submitCaptcha } from '../../../redux/modules/dialog';

class DialogComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      valueError:'',
    }
  }

  handleSubmit(e) {
    e && e.preventDefault();
    if (this.state.value.length > 0) {
      this.props.submitCaptcha(this.state.value);
    } else {
      this.setState({
        valueError: 'Введите больше одного символа',
      });
    }
  }
  handleChange(e){
    this.setState({
      value:e.target.value,
    });
  }
  render() {
    return (<div>
      <Dialog
        title="VK Captcha"
        actions={[<FlatButton
          label="Подтвердите каптчу"
          primary={true}
          disabled={!(this.state.value.length > 0)}
          onTouchTap={::this.handleSubmit}
        />,
        ]}
        modal={true}
        open={this.props.visible}
      >
        <div className="captcha-holder">
          <form noValidate onSubmit={::this.handleSubmit}>
            <div className="img-wr">
              <img src={this.props.captcha_img} alt="" />
            </div>
            <TextField name="search" fullWidth={false}
                       onChange={::this.handleChange}
                       placeholder="Введите каптчу" autoComplete="off"
                       value={this.state.value}
                       className="captcha-field"
                       errorText={this.state.valueError}
            />
          </form>
        </div>
      </Dialog>
    </div>)
  }

}

export default connect(state => state.dialog,
  dispatch=> {
    return bindActionCreators({ submitCaptcha }, dispatch);
  })(DialogComponent);
