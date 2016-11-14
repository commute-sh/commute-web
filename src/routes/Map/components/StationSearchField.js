import React, { PropTypes } from 'react';

import TextField from 'material-ui/TextField';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StationSearchField extends React.Component {

  onChange() {

  }

  render() {

    return (
     <div style={{ margin: '0 20px 0px 20px' }}>

       <TextField
         hintText="Nom de station"
         floatingLabelText="Recherche"
         fullWidth={true}
         style={{ width: '100%' }}
         onChange={this.onChange.bind(this)}
       />

      </div>
    );

  }
}

export default StationSearchField;
