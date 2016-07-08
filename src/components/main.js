import React from 'react'
import firebase from 'firebase'

import { Grid } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Tabs } from 'react-bootstrap'
import { Tab } from 'react-bootstrap'

import Header from './navbar/header'
import SideMenu from './navbar/sidemenu'
import Members from './members'
import Messages from './chat-messages'

import Action from '../Action'
import Store from '../Store'
import EventEmitter from '../EventEmitter'

var dispatcher = new EventEmitter();
var action = new Action(dispatcher);
var store = new Store(dispatcher);

export default class main extends React.Component {
  constructor(props) {
    super(props)

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyB4OQXeOmidR-oKw7XlYMjtNV2TxU-Ects",
      authDomain: "chattool-5a67b.firebaseapp.com",
      databaseURL: "https://chattool-5a67b.firebaseio.com",
      storageBucket: "chattool-5a67b.appspot.com",
    };
    firebase.initializeApp(config);

    // データベースの参照を準備
    this.rootRef = firebase.database().ref();
    this.messagesRef = this.rootRef.child('messages');

    // this.send_message = document.getElementById('sendMessage');
    // this.login_button = document.getElementById('loginButton');


    // this.send_message.addEventListener('click', this.saveMessage.bind(this));
    // this.login_button.addEventListener('click', this.loginByGoogle.bind(this));

    // this.loadMessages();

    this.initFirebase();

    this.state = {
      showModal: store.getLoginModalData()
    };

    store.on('LOGIN_MODAL_CHANGE', () => {
      this.setState({showModal: store.getLoginModalData()})
    });

    store.on('LOGIN_BY_GOOGLE', this.loginByGoogle);
  }

  initFirebase() {
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  //  Googleアカウントでログイン
  loginByGoogle() {
    var auth = firebase.auth();
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(function(result) {
      //  ログイン成功
    }).catch(function(error) {
      //  ログイン失敗
    });
  }

  render() {
    return (
      <div className="wrap">
        <Header parent_state ={{ action : action,
                                showModal : this.state.showModal,
                                loginByGoogle : this._loginByGoogle}} />
        
        <Grid>
          <Row>
            <Col md={3}>
              <SideMenu />
            </Col>
            <Col md={9}>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

