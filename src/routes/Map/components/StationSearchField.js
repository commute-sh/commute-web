import React, { PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StationSearchField extends React.Component {

  onChange() {

  }

  render() {

    return (
     <Paper zDepth={0} style={{ margin: '0 20px 20px 20px' }}>

       <TextField
         hintText="Nom de station"
         floatingLabelText="Recherche"
         fullWidth={true}
         style={{ width: '100%' }}
         onChange={this.onChange.bind(this)}
       />

      </Paper>
    );

  }
}

export default StationSearchField;
