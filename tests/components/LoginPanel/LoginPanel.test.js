// Link.react-test.js
import React from 'react';
import LoginPanel from '../../../src/components/LoginPanel';
import renderer from 'react-test-renderer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { commute500, commute700 } from '../../../src/themes/commuteColors';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Theme
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const commuteTheme = getMuiTheme({
  palette: {
    primary1Color: commute500,
    primary2Color: commute700,
  },
  appBar: {
    height: 64,
  },
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Tests
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test('LoginPanel renders correctly', () => {
  const component = renderer.create(
    <MuiThemeProvider muiTheme={getMuiTheme(commuteTheme)}>
      <LoginPanel />
    </MuiThemeProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
