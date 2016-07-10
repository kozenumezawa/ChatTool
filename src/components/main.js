import React from 'react'

import { Grid } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'

import Header from './navbar/header'
import ContactList from './navbar/contact-list'
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
      searched_user : [],
      logged_in : store.getLoggedinInfo(),
      contact_list : store.getContactList(),
      room_uid : store.getRoomUid(),
      user_name : store.getUserName(),
      show_error_modal : false,
      error_data : {},
      message : ''
    };

    store.on('LOGIN_MODAL_CHANGE', () => {
      this.setState({ show_login_modal: store.getLoginModalData() })
    });

    store.on('SIGN_UP_MODAL_CHANGE', () => {
      this.setState({ show_sign_up_modal: store.getSignUpModalData() })
    });

    store.on('UPDATE_MESSAGE', (message) => {
      this.setState({ message : message });
    });

    store.on('CHANGE_LOGGEDIN_STATE', () => {
      this.setState({ logged_in : store.getLoggedinInfo() })
    });

    store.on('ADD_BY_NAME_MODAL_CHANGE', () => {
      this.setState({ show_add_by_name_modal: store.getAddByNameModal() })
    });

    store.on('END_SEARCH_NAME', (data) => {
      this.setState({ searched_user: data })
    });

    store.on('UPDATA_CONTACT', () => {
      //  updateContactList内で 'GET_CONTACT'が発行され、contact_listが更新される
      store.updateContactList();
    });

    store.on('GET_CONTACT', () => {
      this.setState({ contact_list : store.getContactList() });
    });

    store.on('CHANGE_ROOM', () => {
      // this.setState({ contact_list : store.getContactList() });
      this.setState({ room_uid : store.getRoomUid() });
    });

    store.on('CHANGE_NAME', () => {
      this.setState({ user_name : store.getUserName() });
    });

    store.on('ERROR', (error_data) => {
      this.setState({
        show_error_modal : true,
        error_data : error_data
      });
    });

    store.on('CLOSE_ERROR_MODAL', () => {
      this.setState({
        show_error_modal : false,
        error_data : {}
      });
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
                                  searched_user : this.state.searched_user,
                                  contact_list : this.state.contact_list,
                                  logged_in : this.state.logged_in,
                                  room_uid : this.state.room_uid,
                                  user_name : this.state.user_name,
                                  show_error_modal : this.state.show_error_modal,
                                  error_data : this.state.error_data,
                                  message : this.state.message
                                } } />
        <Grid>
          <Row>
            <Col md={3}>
              <ContactList parent_state = { {
                                  action : action,
                                  show_login_modal : this.state.show_login_modal,
                                  show_sign_up_modal : this.state.show_sign_up_modal,
                                  show_add_by_name_modal : this.state.show_add_by_name_modal,
                                  searched_user : this.state.searched_user,
                                  contact_list : this.state.contact_list,
                                  logged_in : this.state.logged_in,
                                  room_uid : this.state.room_uid,
                                  user_name : this.state.user_name,
                                  show_error_modal : this.state.show_error_modal,
                                  error_data : this.state.error_data,
                                  message : this.state.message
                                } } />
            </Col>
            <Col md={9}>
              <ChatMessages parent_state = { {
                                  action : action,
                                  show_login_modal : this.state.show_login_modal,
                                  show_sign_up_modal : this.state.show_sign_up_modal,
                                  show_add_by_name_modal : this.state.show_add_by_name_modal,
                                  searched_user : this.state.searched_user,
                                  contact_list : this.state.contact_list,
                                  logged_in : this.state.logged_in,
                                  room_uid : this.state.room_uid,
                                  user_name : this.state.user_name,
                                  show_error_modal : this.state.show_error_modal,
                                  error_data : this.state.error_data,
                                  message : this.state.message
                                } } />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

