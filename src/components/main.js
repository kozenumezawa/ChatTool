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
      show_login_modal: store.getLoginModalData(),
      show_sign_up_modal: store.getSignUpModalData(),
      loggedIn : false,
      message : ''
    };

    store.on('LOGIN_MODAL_CHANGE', () => {
      this.setState({ show_login_modal: store.getLoginModalData() })
    });

    store.on('SIGN_UP_MODAL_CHANGE', () => {
      this.setState({ show_sign_up_modal: store.getSignUpModalData() })
    });

    store.on('LOGIN_BY_GOOGLE', () => {
      this.setState({ loggedIn : true })
    });

    store.on('SIGN_UP_BY_MAIL', () => {
      this.setState({ loggedIn : true })
    });

    store.on('UPDATE_MESSAGE', (message) => {
      this.setState({ message : message })
    });

  }


  render() {
    return (
      <div>
        <Header parent_state = { {
                                  action : action,
                                  show_login_modal : this.state.show_login_modal,
                                  show_sign_up_modal : this.state.show_sign_up_modal,
                                  loginByGoogle : this.state.loggedIn,
                                  message : this.state.message
                                } } />
        <Grid>
          <Row>
            <Col md={3}>
              <SideMenu />
            </Col>
            <Col md={9}>
              <ChatMessages parent_state = { {
                                  action : action,
                                  show_login_modal : this.state.show_login_modal,
                                  show_sign_up_modal : this.state.show_sign_up_modal,
                                  loginByGoogle : this.state.loggedIn,
                                  message : this.state.message
                                } } />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

