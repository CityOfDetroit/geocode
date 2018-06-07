import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

class Results extends Component {
  render() {
    return (
      <div style={{ margin: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {this.props.results.length !== 0 ?
          <Table>
            <TableBody>
              {this.props.results.map((r, i) => (
                <TableRow key={i}>
                  {this.props.includeInput ? <TableCell>{r.input}</TableCell> : null}
                  {this.props.includeAddress ? <TableCell>{r.answer.address}</TableCell> : null}
                  {this.props.includeParcel ? <TableCell>{r.answer.attributes.User_fld}</TableCell> : null}
                  {this.props.includeCoordinates ? <TableCell>{r.answer.location.y !== 'NaN' ? r.answer.location.y.toFixed(6) : ``}</TableCell> : null}
                  {this.props.includeCoordinates ? <TableCell>{r.answer.location.x !== 'NaN' ? r.answer.location.x.toFixed(6) : ``}</TableCell> : null}
                </TableRow>
              ))}
            </TableBody>
          </Table> : <span style={{ display: 'flex', justifyContent: 'center' }}>You didn't enter any addresses!</span>}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1em' }}>
          <Button variant="contained" color="secondary" onClick={this.props.handleExit}>
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
