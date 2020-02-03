import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signInAction } from '../../actions/auth';
import { connect } from 'react-redux';

//import from material-ui
import {Paper, TextField, FlatButton} from 'material-ui';
import {grey400} from 'material-ui/styles/colors';
//import from material-ui

const styles = {
  grey400: {
    backgroundColor: grey400,
  },
  marginLeft: {
    marginLeft: 20,
  },
  paper: {
    width: "100%",
    marginTop: 45
  },
}
const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    // underlineShow={false}
    style={styles.marginLeft}
    {...input}
    {...custom}
  />
)

class SignIn extends Component {
  submit = (values) => {
    console.log(this.props);
    this.props.signInAction(values, this.props.history);
    // console.log(values);
  }
  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="info-red">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    // console.log(this.props);
    return (
      <Paper zDepth={2} style={styles.paper}>
        <div className="form">
          <div className="container">
            <form onSubmit={ handleSubmit(this.submit) }>
              <Field name="userName"
                    component={renderTextField}
                    type="text"
                    placeholder="User Name"
              />
              <Field name="password"
                    component={renderTextField}
                    type="password"
                    placeholder="Password"
              />
              <FlatButton
                type="submit"
                label="Sign In"
                secondary
              />
            </form>
          </div>
        </div>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormSignIn = reduxForm({
  form: 'signin'
})(SignIn);

export default connect(mapStateToProps, {signInAction})(reduxFormSignIn)
