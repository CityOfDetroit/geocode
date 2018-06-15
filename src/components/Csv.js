import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import Button from '@material-ui/core/Button';
import { ENGINE_METHOD_CIPHERS } from 'constants';

class Csv extends Component {
  render() {
    // flatten results and include only necessary output fields for CSVLink
    let formattedData = [];
    this.props.results.map(r => (
      formattedData.push({ 
        "input": `${r.input}`,
        "address": `${r.answer.address}`,
        "parcel": this.props.excelFormat ? `=""${r.answer.attributes['User_fld']}""` : `${r.answer.attributes['User_fld']}`,
        "lat": r.answer.location.y ? `${r.answer.location.y}` : '',
        "lng": r.answer.location.x ? `${r.answer.location.x}` : '',
      })
    ));

    return (
      <Button variant="contained" color="primary" style={{ marginLeft: this.props.excelFormat ? '1em' : 0 }}>
        <CSVLink data={formattedData} filename={"geocodingResults.csv"}>
          <span style={{ color: '#fff', textDecoration: 'none' }}>Download {this.props.excelFormat ? ` for Excel` : ` CSV`}</span>
        </CSVLink>
      </Button>
    );
  }
}

Csv.propTypes = {
  results: PropTypes.array.isRequired,
  excelFormat: PropTypes.bool
}

export default Csv;
