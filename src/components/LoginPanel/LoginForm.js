import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { RaisedButton } from 'material-ui'

const validate = values => {
  const errors = {};
  const requiredFields = [ 'email', 'password' ];

  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors;
};


class LoginForm extends Component {

  static propTypes = {
    handleLogin: PropTypes.func
  };

  componentDidMount() {
    this.refs.email            // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus();                // on TextField
  }

  render() {

    const { handleSubmit, handleLogin, pristine, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(handleLogin)}>
        <Field name="email" component={TextField}
               floatingLabelText="Email"
               fullWidth={true}
               type="email"
               floatingLabelFixed={true}
               inputStyle={{ marginLeft: 4, marginTop: 4, fontSize: '14px' }}
               floatingLabelStyle={{ top: 24, fontFamily: 'Lobster' }}
               floatingLabelFocusStyle={{ top: 24, fontFamily: 'Lobster' }}
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
        />

        <RaisedButton
          type="submit"
          label="Se connecter"
          disabled={pristine || submitting}
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
