import React from 'react'

import { Grid } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'

import Header from './navbar/header'
import SideMenu from './navbar/sidemenu'
import ChatMessages from'./chat-messages'

import Action from '../Action'
import Store from '../Store'
import EventEmitter from '../EventEmitter'

var dispatcher = new EventEmitter();
var action = new Action(dispatcher);
var store = new Store(dispatcher);

export default class main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: store.getLoginModalData(),
      loggedIn : false
    };

    store.on('LOGIN_MODAL_CHANGE', () => {
      this.setState({ showModal: store.getLoginModalData() })
    });

    store.on('LOGIN_BY_GOOGLE', () => {
      this.setState({ loggedIn : true })
    });
  }
  

  render() {
    return (
      <div>
        <Header parent_state ={{ action : action,
                                showModal : this.state.showModal,
                                loginByGoogle : this.state.loggedIn }} />
        <Grid>
          <Row>
            <Col md={3}>
              <SideMenu />
            </Col>
            <Col md={9}>
              <ChatMessages />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

