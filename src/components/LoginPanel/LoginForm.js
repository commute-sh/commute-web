import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { RaisedButton } from 'material-ui'
import Loader from './Loader';

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
    submitTitle: PropTypes.string,
    login: PropTypes.shape({
      isFetching: PropTypes.bool,
      errMessage: PropTypes.string
    }),
    onLoginSubmit: PropTypes.func
  };

  render() {

    const { submitTitle, handleSubmit, onLoginSubmit, pristine, submitting, invalid, login: { isFetching, errMessage } } = this.props;

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

        <form onSubmit={handleSubmit(onLoginSubmit)}>
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
  form: 'loginForm',
  initialValues: {
    email: '',
    password: ''
  },
  validate
})(LoginForm);
