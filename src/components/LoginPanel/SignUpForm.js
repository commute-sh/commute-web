import React, { Component, PropTypes } from 'react'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { RaisedButton } from 'material-ui'
import Loader from './Loader'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const validate = values => {
  const errors = {};
  const requiredFields = [ 'username', 'password', 'email', 'givenName', 'familyName' ];

  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required';
    }
  });

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors[ 'email' ] = `Email address is invalid`;
  }

  return errors;
};

class SignUpForm extends Component {

  static propTypes = {
    signUp: PropTypes.shape({
      isFetching: PropTypes.bool,
      errMessage: PropTypes.string
    }),
    onSubmit: PropTypes.func,
    submitTitle: PropTypes.string
  };

  onSubmit(values) {
      this.props.onSubmit(values);
  }

  render() {

    const { submitTitle, handleSubmit, pristine, submitting, invalid, signUp: { isFetching, errMessage } } = this.props;

    return (
      <div style={{ position: 'relative' }}>

        { isFetching &&
          <Loader style={{
            zIndex: 5,
            position: 'absolute', top: 0, bottom: 0, left: 0, right: 0
          }} />
        }

        { errMessage &&
          <div style={{ color: 'red', fontSize: 12, padding: 5, paddingBottom: 10 }}>
            {errMessage}
          </div>
        }

        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

          <Field name="username" component={TextField}
                 floatingLabelText="Username"
                 fullWidth={true}
                 floatingLabelFixed={true}
                 inputStyle={{ marginLeft: 4, marginTop: 4, fontSize: '14px' }}
                 floatingLabelStyle={{ top: 24, fontFamily: 'Lobster' }}
                 floatingLabelFocusStyle={{ top: 24, fontFamily: 'Lobster' }}
                 errorStyle={{ marginTop: 6, textAlign: 'left' }}
                 style={{ height: 58 }}
                 ref="username" withRef />

          <Field name="email" component={TextField}
                 floatingLabelText="Email"
                 fullWidth={true}
                 type="email"
                 floatingLabelFixed={true}
                 inputStyle={{ marginLeft: 4, marginTop: 4, fontSize: '14px' }}
                 floatingLabelStyle={{ top: 24, fontFamily: 'Lobster' }}
                 floatingLabelFocusStyle={{ top: 24, fontFamily: 'Lobster' }}
                 errorStyle={{ marginTop: 6, textAlign: 'left' }}
                 style={{ height: 58 }}
                 ref="email" withRef />

          <Field name="password" component={TextField}
                 floatingLabelText="Mot de passe"
                 floatingLabelFixed={true}
                 fullWidth={true}
                 type="password"
                 inputStyle={{ marginLeft: 4, marginTop: 10, fontSize: '14px' }}
                 floatingLabelStyle={{ top: 34, fontFamily: 'Lobster' }}
                 floatingLabelFocusStyle={{ top: 34, fontFamily: 'Lobster' }}
                 errorStyle={{ textAlign: 'left' }}
          />

          <Field name="givenName" component={TextField}
                 floatingLabelText="Prénom"
                 fullWidth={true}
                 floatingLabelFixed={true}
                 inputStyle={{ marginLeft: 4, marginTop: 4, fontSize: '14px' }}
                 floatingLabelStyle={{ top: 24, fontFamily: 'Lobster' }}
                 floatingLabelFocusStyle={{ top: 24, fontFamily: 'Lobster' }}
                 errorStyle={{ marginTop: 6, textAlign: 'left' }}
                 style={{ height: 58 }}
                 ref="givenName" withRef />

          <Field name="familyName" component={TextField}
                 floatingLabelText="Nom de famille"
                 fullWidth={true}
                 floatingLabelFixed={true}
                 inputStyle={{ marginLeft: 4, marginTop: 4, fontSize: '14px' }}
                 floatingLabelStyle={{ top: 24, fontFamily: 'Lobster' }}
                 floatingLabelFocusStyle={{ top: 24, fontFamily: 'Lobster' }}
                 errorStyle={{ marginTop: 6, textAlign: 'left' }}
                 style={{ height: 58 }}
                 ref="familyName" withRef />

          <RaisedButton
            type="submit"
            label={submitTitle}
            disabled={pristine || submitting || invalid}
            backgroundColor="#345d79"
            labelColor="white"
            fullWidth={true}
            labelStyle={{ fontFamily: 'Lobster', textTransform: 'none' }}
            style={{ marginTop: 10, height: 44 }}
          />

        </form>

      </div>
    )
  }

}

export default reduxForm({
  form: 'signUpForm',
  initialValues: {
    username: '',
    email: '',
    password: '',
    givenName: '',
    familyName: ''
  },
  validate: validate
})(SignUpForm);
