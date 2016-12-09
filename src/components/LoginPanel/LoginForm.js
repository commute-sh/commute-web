import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { RaisedButton } from 'material-ui'
import CircularProgress from 'material-ui/CircularProgress';

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
    isLogging: PropTypes.bool,
    statusText: PropTypes.string,
    handleLogin: PropTypes.func
  };

  state = {
    statusText: undefined
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.statusText && this.state.submitted ) {
      this.setState({ statusText: nextProps.statusText });
    }
    if (nextProps.isLogging) {
      this.setState({ submitted: true });
    }
  }

  render() {

    const { handleSubmit, handleLogin, pristine, submitting, invalid } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        { this.props.isLogging &&
          <div style={{
            zIndex: 5,
            background: '#fff', opacity: 0.8,
            position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <CircularProgress />
          </div>
        }
        {
          this.state.statusText &&
            <div style={{ color: 'red', fontSize: 12, padding: 5, paddingBottom: 10 }}>
              {this.state.statusText}
            </div>
        }
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
