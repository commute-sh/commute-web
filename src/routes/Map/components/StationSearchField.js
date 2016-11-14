import React, { PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StationSearchField extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  handleUpdateInput = (value) => {

  };

  render() {

    return (
     <Paper zDepth={0} style={{ margin: '0 20px 20px 20px' }}>
        <AutoComplete
          hintText="Nom de station"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          floatingLabelText="Recherche"
          fullWidth={true}
          textFieldStyle={{ width: '100%' }}
        />
      </Paper>
    );

  }
}

export default StationSearchField;
