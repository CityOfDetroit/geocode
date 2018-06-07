import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

class Inputs extends Component {
  render() {
    return (
      <div>
        <TextField
            id="multiline-flexible"
            label="Enter addresses here"
            multiline
            rowsMax="1000"
            value={this.props.multiline.join("\n")}
            onChange={this.props.handleChange}
            margin="normal"/>

        <FormControl component="fieldset">
          <FormLabel component="legend">Geocoding options</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value="Include my original input"
                    checked={this.props.returnInput}
                    onChange={this.props.handleCheckboxChange('returnInput')} />}
                label="Return original input" />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Matched address"
                    checked={this.props.returnAddress}
                    onChange={this.props.handleCheckboxChange('returnAddress')} />}
                label="Return matched address" />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Parcel ID"
                    checked={this.props.returnParcel}
                    onChange={this.props.handleCheckboxChange('returnParcel')} />}
                label="Return parcel number" />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Coordinates"
                    checked={this.props.returnCoordinates}
                    onChange={this.props.handleCheckboxChange('returnCoordinates')} />}
                label="Return address coordinates" />
          </FormGroup>
        </FormControl>

        <Button variant="outlined" onClick={this.props.handleClick}>
          Geocode em
        </Button>
      </div>
    );
  }
}

Inputs.propTypes = {
  handleClick: PropTypes.func,
  handleChange: PropTypes.func,
  handleCheckboxChange: PropTypes.func,
  multiline: PropTypes.array,
  returnInput: PropTypes.bool,
  returnAddress: PropTypes.bool,
  returnParcel: PropTypes.bool,
  returnCoordinates: PropTypes.bool,
}

export default Inputs;
