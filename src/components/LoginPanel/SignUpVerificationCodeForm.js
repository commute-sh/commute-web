import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { RaisedButton } from 'material-ui'
import { Loader } from './Loader'

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
    signUpVerifyCode: PropTypes.shape({
      isFetching: PropTypes.bool,
      statusText: PropTypes.string
    }),
    onSubmit: PropTypes.func
  };

  state = {
    statusText: undefined
  };

  render() {

    const { handleSubmit, onSubmit, pristine, submitting, invalid, signUpVerifyCode: { isFetching, errMessage } } = this.props;

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

        <form onSubmit={handleSubmit(onSubmit)}>

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
  form: 'signUpVerificationCodeForm',
  initialValues: {
    verificationCode: ''
  },
  validate
})(SignUpVerificationCodeForm);
