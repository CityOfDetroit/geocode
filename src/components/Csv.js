import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import Button from '@material-ui/core/Button';

class Csv extends Component {
  render() {
    // flatten results and include only necessary output fields for CSVLink
    let formattedData = [];
    this.props.results.map(r => (
      formattedData.push({ 
        "input": `${r.input}`,
        "address": `${r.answer.address}`,
        "parcel": `${r.answer.attributes['User_fld']}`,
        "lat": `${r.answer.location.y}`,
        "lng": `${r.answer.location.x}`
      })
    ));

    return (
      <Button variant="contained" color="primary">
        <CSVLink data={formattedData} filename={"geocodingResults.csv"}>
          <span style={{ color: '#fff', textDecoration: 'none' }}>Download CSV</span>
        </CSVLink>
      </Button>
    );
  }
}

Csv.propTypes = {
  results: PropTypes.array.isRequired
}

export default Csv;
