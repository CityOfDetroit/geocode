import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './App.css';

import Inputs from './components/Inputs';
import Results from './components/Results';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multiline: [],
      returnInput: true,
      returnAddress: true,
      returnParcel: true,
      returnCoordinates: true,
      fetchedResults: false,
      results: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleChange = event => {
    this.setState({
      multiline: event.target.value.split("\n")
    });
  }

  handleClick = event => {
    const geocodeUrl = `https://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/geocodeAddresses`
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
    this.setState({ [name]: event.target.checked });
  }

  handleExit = () => {
    this.setState({ fetchedResults: false });
  }

  render() {
    return (
      <div className="App">
        {this.state.fetchedResults ?
          <Results 
            results={this.state.results}
            includeInput={this.state.returnInput}
            includeAddress={this.state.returnAddress}
            includeParcel={this.state.returnParcel}
            includeCoordinates={this.state.returnCoordinates}
            handleExit={this.handleExit} /> 
        : <Inputs
            handleClick={this.handleClick} 
            handleChange={this.handleChange}
            handleCheckboxChange={this.handleCheckboxChange}
            multiline={this.state.multiline}
            returnInput={this.state.returnInput}
            returnAddress={this.state.returnAddress}
            returnParcel={this.state.returnParcel}
            returnCoordinates={this.state.returnCoordinates} />
        }
      </div>
    );
  }
}

export default App;
