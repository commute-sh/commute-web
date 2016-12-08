import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { RaisedButton } from 'material-ui'

const validate = values => {
  const errors = {};
  const requiredFields = [ 'username', 'password' ];

  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

  return errors;
};


class LoginForm extends Component {

  static propTypes = {
    handleLogin: PropTypes.func
  };

  render() {

    const { handleSubmit, handleLogin, pristine, submitting, invalid } = this.props;

    return (
      <form onSubmit={handleSubmit(handleLogin)}>
        <Field name="username" component={TextField}
               floatingLabelText="Identifiant"
               fullWidth={true}
               type="username"
               floatingLabelFixed={true}
               inputStyle={{ marginLeft: 4, marginTop: 4, fontSize: '14px' }}
               floatingLabelStyle={{ top: 24, fontFamily: 'Lobster' }}
               floatingLabelFocusStyle={{ top: 24, fontFamily: 'Lobster' }}
               style={{ height: 58 }}
               errorStyle={{ marginTop: 6, textAlign: 'left' }}
               ref="username" withRef />

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

        <RaisedButton
          type="submit"
          label="Se connecter"
          disabled={pristine || submitting || invalid}
          backgroundColor="#345d79"
          labelColor="white"
          fullWidth={true}
          labelStyle={{ fontFamily: 'Lobster', textTransform: 'none' }}
          style={{ marginTop: 10, height: 44 }}
        />

      </form>
    )
  }

}

export default reduxForm({
  form: 'loginForm',
  initialValues: {
    email: '',
    password: ''
  },
  validate
})(LoginForm);
