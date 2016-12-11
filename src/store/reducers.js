import { combineReducers } from 'redux'
import loginReducer from './login'
import logoutReducer from './logout'
import signUpReducer from './signUp'
import signUpVerifyCodeReducer from './signUpVerifyCode'
import userInfosReducer from './userInfos'
import locationReducer from './location'
import { reducer as formReducer } from 'redux-form'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    login: loginReducer,
    logout: logoutReducer,
    signUp: signUpReducer,
    signUpVerifyCode: signUpVerifyCodeReducer,
    userInfos: userInfosReducer,
    form: formReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return;
  }

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
