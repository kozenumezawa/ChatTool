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
      show_add_by_name_modal: store.getAddByNameModal(),
      logged_in : store.getLoggedinInfo(),
      message : ''
    };

    store.on('LOGIN_MODAL_CHANGE', () => {
      this.setState({ show_login_modal: store.getLoginModalData() })
    });

    store.on('SIGN_UP_MODAL_CHANGE', () => {
      this.setState({ show_sign_up_modal: store.getSignUpModalData() })
    });

    store.on('UPDATE_MESSAGE', (message) => {
      this.setState({ message : message })
    });

    store.on('CHANGE_LOGGEDIN_STATE', () => {
      this.setState({ logged_in : store.getLoggedinInfo() })
    });

    store.on('ADD_BY_NAME_MODAL_CHANGE', () => {
      this.setState({ show_add_by_name_modal: store.getAddByNameModal() })
    });
  }


  render() {
    return (
      <div>
        <Header parent_state = { {
                                  action : action,
                                  show_login_modal : this.state.show_login_modal,
                                  show_sign_up_modal : this.state.show_sign_up_modal,
                                  show_add_by_name_modal : this.state.show_add_by_name_modal,
                                  logged_in : this.state.logged_in,
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
                                  logged_in : this.state.logged_in,
                                  message : this.state.message
                                } } />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

