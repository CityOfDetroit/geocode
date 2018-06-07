import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

class Inputs extends Component {
  render() {
    return (
      <div style={{ marginTop: '1em', display: 'flex', justifyContent: 'center' }}>
        <Card style={{ margin: '1em' }}>
          <CardHeader title="1. Enter your addresses" subheader="Copy + paste from a spreadsheet or type an address per line" />
            <CardContent>
              <TextField
                id="multiline-flexible"
                label="Addresses go here"
                multiline
                rowsMax="1000"
                value={this.props.multiline.join("\n")}
                onChange={this.props.handleChange}
                margin="normal"/>
            </CardContent>
        </Card>
        <Card style={{ margin: '1em', width: '400px' }}>
          <CardHeader title="2. Pick your output" subheader="What fields do you want returned?" />
            <CardContent>
              <FormControl component="fieldset">
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Checkbox
                        value="Include my original input"
                        checked={this.props.returnInput}
                        onChange={this.props.handleCheckboxChange('returnInput')} />}
                    label="Original input" />
                    <FormControlLabel
                    control={
                        <Checkbox
                        value="Matched address"
                        checked={this.props.returnAddress}
                        onChange={this.props.handleCheckboxChange('returnAddress')} />}
                    label="Matched address" />
                    <FormControlLabel
                    control={
                        <Checkbox
                        value="Parcel ID"
                        checked={this.props.returnParcel}
                        onChange={this.props.handleCheckboxChange('returnParcel')} />}
                    label="Parcel number" />
                    <FormControlLabel
                    control={
                        <Checkbox
                        value="Coordinates"
                        checked={this.props.returnCoordinates}
                        onChange={this.props.handleCheckboxChange('returnCoordinates')} />}
                    label="Geographic coordinates" />
                </FormGroup>
              </FormControl>
            </CardContent>
        </Card>
        <Card style={{ margin: '1em', width: '400px' }}>
          <CardHeader title="3. Geocode!" subheader="Generate a table of geocoded addresses that you can copy + paste into your own workflow" />       
            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="primary" onClick={this.props.handleClick} style={{ fontWeight: 700 }}>
                Go!
              </Button>
            </CardActions>
        </Card>
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
