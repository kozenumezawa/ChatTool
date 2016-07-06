import React from 'react'

import { Nav } from 'react-bootstrap'
import { NavItem } from 'react-bootstrap'

export default class sidemenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Nav bsStyle="pills" activeKey={1} stacked>
        <NavItem eventKey={1} href="#">Home</NavItem>
        <NavItem eventKey={2} href="#">About</NavItem>
        <NavItem eventKey={3} href="#">Contact</NavItem>
      </Nav>
    );
  }
}
