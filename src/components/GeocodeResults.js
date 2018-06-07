import React, { Component } from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


class GeocodeResults extends Component {

  render() {
    return (
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
      </Table>
    )
  }

}

export default GeocodeResults