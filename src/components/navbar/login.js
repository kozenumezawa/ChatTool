import React from 'react'

import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'

import MemberForm from '../memberform'

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ showModal: false});
  }

  open() {
    this.setState({ showModal: true});
  }

  render() {
    return (
      <div>
        <Button onClick={this.open}>Add</Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MemberForm />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.close}>Save</Button>
            <Button onClick={this.close}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

