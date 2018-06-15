import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';

import Csv from './Csv';

class Results extends Component {
  render() {
    return (
      <div style={{ margin: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        {this.props.results.length !== 0 ?
          <Table style={{ margin: '.5em', width: '100%' }}>
            <TableHead>
                <TableRow>
                  {this.props.includeInput ? <TableCell style={{padding: 5}}>Input</TableCell> : null}
                  {this.props.includeAddress ? <TableCell style={{padding: 5}}>Address</TableCell> : null}
                  {this.props.includeParcel ? <TableCell style={{padding: 5}}>Parcel</TableCell> : null}
                  {this.props.includeCoordinates ? <TableCell style={{padding: 5}}>Lat</TableCell> : null}
                  {this.props.includeCoordinates ? <TableCell style={{padding: 5}}>Lng</TableCell> : null}
                </TableRow>
            </TableHead>
            <TableBody>
              {this.props.results.map((r, i) => (
                <TableRow key={i}>
                  {this.props.includeInput ? <TableCell style={{padding: 5}}>{r.input}</TableCell> : null}
                  {this.props.includeAddress ? <TableCell style={{padding: 5}}>{r.answer.address}</TableCell> : null}
                  {this.props.includeParcel ? <TableCell style={{padding: 5}}>{r.answer.attributes.User_fld}</TableCell> : null}
                  {this.props.includeCoordinates ? <TableCell style={{padding: 5}}>{r.answer.location.y !== 'NaN' ? r.answer.location.y.toFixed(6) : ``}</TableCell> : null}
                  {this.props.includeCoordinates ? <TableCell style={{padding: 5}}>{r.answer.location.x !== 'NaN' ? r.answer.location.x.toFixed(6) : ``}</TableCell> : null}
                </TableRow>
              ))}
            </TableBody>
          </Table> 
        : <span style={{ display: 'flex', justifyContent: 'center' }}>You didn't enter any addresses!</span>}

        <div style={{ display: 'flex', justifyContent: 'center', margin: '1em' }}>
          {this.props.results.length !== 0 ? 
            <div>
              <Csv results={this.props.results} />
              <Csv results={this.props.results} excelFormat/>
            </div> : null}
          <Button variant="contained" color="secondary" onClick={this.props.handleExit} style={{ marginLeft: '1em' }}>
            Start Over
          </Button>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  results: PropTypes.array,
  includeInput: PropTypes.bool,
  includeAddress: PropTypes.bool,
  includeParcel: PropTypes.bool,
  includeCoordinates: PropTypes.bool,
  handleExit: PropTypes.func,
}

export default Results;
