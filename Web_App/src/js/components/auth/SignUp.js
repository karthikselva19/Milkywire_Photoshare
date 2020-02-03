import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signUpAction } from '../../actions/auth';
import { connect } from 'react-redux';
import '../../../index.css';
//import from material-ui
import {Paper, TextField, RaisedButton, Divider} from 'material-ui';
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
    marginTop: 100,
    width: "30%",
  },
}

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName', 'email', 'userName', 'password' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    underlineShow={false}
    style={styles.marginLeft}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class SignUp extends Component {
  submit = (values) => {
    // console.log(this.props);
    this.props.signUpAction(values, this.props.history);
    // console.log(values);
  }
  errorMessage() {
    if (this.props.errorMessage) {
      alert(this.props.errorMessage);
      // return (
      //   <div className="info-red">
      //     {this.props.errorMessage}
      //   </div>
      // );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className = "Aligner">
        <Paper zDepth={2} style={styles.paper}>
          <h2 style={styles.marginLeft}>Sign Up</h2>
          <Divider/>
          <div className="form">
            <div className="container">
              <form onSubmit={ handleSubmit(this.submit) }>
                <Field name="firstName"
                      component={renderTextField}
                      type="text"
                      placeholder="First Name"
                />
                <Field name="lastName"
                      component={renderTextField}
                      type="text"
                      placeholder="Last Name"
                />
                <Field name="email"
                      component={renderTextField}
                      type="text"
                      placeholder="Email"
                />
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
                <RaisedButton
                  type="submit"
                  label="Sign Up for PhotoShare"
                  primary
                />
              </form>
            </div>
          </div>
        </Paper>
        {this.errorMessage()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormSignUp = reduxForm({
  form: 'signin',
  validate
})(SignUp);

export default connect(mapStateToProps, {signUpAction})(reduxFormSignUp)
