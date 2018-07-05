import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import _ from 'lodash';

const Summary = ({results}) => {
  const answers = results.map(r => {return r.answer})
  const matched = _.filter(answers, a => {return (a.attributes.Status === 'M' || a.attributes.Status === 'T')})
  const unmatched = answers.length - matched.length
  const addrPointMatched = answers.filter(a => { return (a.attributes.Status === 'M' || a.attributes.Status === 'T') && a.attributes.Loc_name === 'AddressPointGe'})
  const centerlineMatched = answers.filter(a => { return (a.attributes.Status === 'M' || a.attributes.Status === 'T') && a.attributes.Loc_name === 'StreetCenterli'})

  return (
    <Card>
      <CardHeader title="Geocoding results" style={{padding: '.5em', margin: '.5em'}}/>
      <CardContent style={{padding: 0, margin: 0}}>
        <ul>
          <li>You submitted {answers.length} addresses</li>
          <li>{matched.length} addresses were matched.</li>
          <li>{unmatched} addresses were not matched.</li>
          <li>{addrPointMatched.length} addresses matched an exact address point.</li>
          <li>{centerlineMatched.length} addresses did not match an address point, but were matched against the street centerline.</li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default Summary;
