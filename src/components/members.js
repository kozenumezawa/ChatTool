import React from 'react'

import { Table } from 'react-bootstrap'

export default class members extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Table striped>
        <thead>
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Position</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>10</td>
          <td>Kagawa</td>
          <td>MF</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Honda</td>
          <td>MF</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Nagatomo</td>
          <td>DF</td>
        </tr>
        <tr>
          <td>9</td>
          <td>Okazaki</td>
          <td>FW</td>
        </tr>
        </tbody>
      </Table>
    );
  }
}
