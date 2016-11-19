import React, { PropTypes } from 'react';

export const StationType = PropTypes.arrayOf(PropTypes.shape({
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  banking: PropTypes.boolean,
  bonus: PropTypes.boolean,
  status: PropTypes.string,
  contract_name: PropTypes.string.isRequired,
  bike_stands: PropTypes.number.isRequired,
  available_bike_stands: PropTypes.number.isRequired,
  available_bikes: PropTypes.number.isRequired,
  last_update: PropTypes.object.isRequired,
  distance: PropTypes.number,

}))
