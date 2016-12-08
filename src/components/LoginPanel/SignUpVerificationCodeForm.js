import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { RaisedButton } from 'material-ui'

const validate = values => {
  const errors = {};
  const requiredFields = [ 'verificationCode' ];

  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

  if (values.verificationCode && !/^[0-9]{6}$/i.test(values.verificationCode)) {
    errors.verificationCode = 'Code de vérification invalide (6 caractères numériques)'
  }

  return errors;
};


class SignUpVerificationCodeForm extends Component {

  static propTypes = {
    handleSignUpVerifyCode: PropTypes.func
  };

  render() {

    const { handleSubmit, handleSignUpVerifyCode, pristine, submitting, invalid } = this.props;

    return (
      <form onSubmit={handleSubmit(handleSignUpVerifyCode)}>

        <Field name="verificationCode" component={TextField}
               floatingLabelText="Code de vérification"
               fullWidth={true}
               floatingLabelFixed={true}
               inputStyle={{ marginLeft: 4, marginTop: 4, fontSize: '14px' }}
               floatingLabelStyle={{ top: 24, fontFamily: 'Lobster' }}
               floatingLabelFocusStyle={{ top: 24, fontFamily: 'Lobster' }}
               errorStyle={{ marginTop: 6, textAlign: 'left' }}
               style={{ height: 58 }}
               ref="verificationCode" withRef />

        <RaisedButton
          type="submit"
          label="Confirmez votre code"
          disabled={pristine || submitting || invalid}
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
  form: 'signUpVerificationCodeForm',
  initialValues: {
    verificationCode: ''
  },
  validate
})(SignUpVerificationCodeForm);
