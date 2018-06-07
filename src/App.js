import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import logo from './logo.svg';
import './App.css';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button'

import GeocodeResults from './components/GeocodeResults'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      multiline: [],
      returnInput: true,
      returnAddress: true,
      returnParcel: false,
      returnCoordinates: false,
      fetchedResults: false,
      results: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  handleChange = event => {
    this.setState({
      multiline: event.target.value.split("\n"),
    });
  };

  handleClick = event => {
    const geocodeUrl = `https://gis.detroitmi.gov/arcgis/rest/services/DoIT/AddressPointGeocoder/GeocodeServer/geocodeAddresses`
    const addresses = { 
      records: this.state.multiline.map((a, i) => {
        return { 
          "attributes": {"OBJECTID": i, "SingleLine": a}
        }
    })}
    console.log(JSON.stringify(addresses))

    const bodyFormData = new FormData();
    bodyFormData.set('addresses', JSON.stringify(addresses))
    bodyFormData.set('f', 'json')
    bodyFormData.set('outSR', 4326)

    axios({
      url: geocodeUrl,
      method: 'post',
      data: bodyFormData
    }).then(r => {

      // const sortedResults = r.data.locations.sort((a, b) => { return a.attributes.ResultID > b.attributes.ResultID })
      const sortedResults = _.sortBy(r.data.locations, 'attributes.ResultID')
      console.log(this.state.multiline)
      console.log(sortedResults)
      this.setState({
        fetchedResults: true,
        results: this.state.multiline.map((a, i) => {
          return {"input": a, "answer": sortedResults[i]}
        })
      })
    })

  };

  handleCheckboxChange = name => event => {
    this.setState({ [name]: event.target.checked})
  }

  render() {
    return (
      <div className="App">


        {this.state.fetchedResults ? 
          <GeocodeResults 
            results={this.state.results}
            includeInput={this.state.returnInput}
            includeAddress={this.state.returnAddress}
            includeParcel={this.state.returnParcel}
            includeCoordinates={this.state.returnCoordinates}
            /> :         
            <div><TextField
            id="multiline-flexible"
            label="Enter addresses here"
            multiline
            rowsMax="1000"
            value={this.state.multiline.join("\n")}
            onChange={this.handleChange}
            margin="normal"
          />
  
          <FormControl component="fieldset">
            <FormLabel component="legend">Geocoding options</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                  value="Include my original input"
                  checked={this.state.returnInput}
                  onChange={this.handleCheckboxChange('returnInput')}
                />
                }
                label="Return original input"
              />
              <FormControlLabel
                control={
                  <Checkbox
                  value="Matched address"
                  checked={this.state.returnAddress}
                  onChange={this.handleCheckboxChange('returnAddress')}
                />
                }
                label="Return matched address"
              />
              <FormControlLabel
                control={
                  <Checkbox
                  value="Parcel ID"
                  checked={this.state.returnParcel}
                  onChange={this.handleCheckboxChange('returnParcel')}
                />
                }
                label="Return parcel number"
              />
              <FormControlLabel
                control={
                  <Checkbox
                  value="Coordinates"
                  checked={this.state.returnCoordinates}
                  onChange={this.handleCheckboxChange('returnCoordinates')}
                />
                }
                label="Return address coordinates"
              />
            </FormGroup>
          </FormControl>
  
          <Button variant="outlined" onClick={this.handleClick}>
            Geocode em
          </Button></div>}
      </div>
    );
  }
}

export default App;
