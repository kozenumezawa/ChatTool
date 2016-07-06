import React from 'react'

import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { MenuItem } from 'react-bootstrap'

export default class header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap Sample</a>
          </Navbar.Brand>
        </Navbar.Header>

        <Nav pullRight>
          <NavDropdown eventKey={1} title="Settings" >
            <MenuItem eventKey={1.1}>Profile</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={1.2}>Sign out</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
