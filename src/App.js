import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';

import Inputs from './components/Inputs';
import Results from './components/Results';
import Intro from './components/Intro';
import Summary from './components/Summary'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multiline: ['2806 Cambridge', '1234 Fake', '1611 Hubbard'],
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
      multiline: event.target.value.split("\n"),
    });
  }

  handleClick = event => {
    const geocodeUrl = `https://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/geocodeAddresses`;
    const addresses = { 
      records: this.state.multiline.map((a, i) => {
        return { 
          "attributes": {"OBJECTID": i, "SingleLine": a}
        }
    })};

    const bodyFormData = new FormData();
    bodyFormData.set('addresses', JSON.stringify(addresses));
    bodyFormData.set('f', 'json');
    bodyFormData.set('outSR', 4326);

    fetch(geocodeUrl, {
      body: bodyFormData,
      method: 'POST'
    }).then(r => r.json()).then(r => {
      const sortedResults = _.sortBy(r.locations, 'attributes.ResultID');
      this.setState({
        fetchedResults: true,
        results: this.state.multiline.map((a, i) => {
          return {"input": a, "answer": sortedResults[i]}
        })
      });
    }).catch(e => console.log(e));
  }

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
        <div>
          <Summary results={this.state.results} />
          <Results 
            results={this.state.results}
            includeInput={this.state.returnInput}
            includeAddress={this.state.returnAddress}
            includeParcel={this.state.returnParcel}
            includeCoordinates={this.state.returnCoordinates}
            handleExit={this.handleExit} />
        </div>
        : 
        <div>
          <Intro />
          <Inputs
              handleClick={this.handleClick} 
              handleChange={this.handleChange}
              handleCheckboxChange={this.handleCheckboxChange}
              multiline={this.state.multiline}
              returnInput={this.state.returnInput}
              returnAddress={this.state.returnAddress}
              returnParcel={this.state.returnParcel}
              returnCoordinates={this.state.returnCoordinates} />
        </div>
        }
      </div>
    );
  }
}

export default App;
