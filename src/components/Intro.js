import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

const Intro = () => {
  return (
    <Card>
      <CardHeader title="Detroit address geocoder" style={{padding: '.5em', margin: '.5em'}}/>
      <CardContent style={{padding: 0, margin: 0}}>
        <ul>
          <li>Quickly verify addresses and look up parcel numbers and geographic coordinates for an address.</li>
          <li>The city's <a href="http://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer">composite geocoder</a> will return results for each address.</li>
          <li>Addresses should only consist of a street number and street name - <b>don't include</b> a state, city, or zip.</li>
          <li>All addresses should be in <b>Detroit only.</b></li>
          <li>Want to know more? <a href="https://cityofdetroit.github.io/iet">Read our blog post!</a></li>
          
        </ul>
      </CardContent>
    </Card>
  )
}

export default Intro;