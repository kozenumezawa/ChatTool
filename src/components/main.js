import React from 'react'
import Firebase from 'firebase'

import { Grid } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Tabs } from 'react-bootstrap'
import { Tab } from 'react-bootstrap'

import Header from './navbar/header'
import SideMenu from './navbar/sidemenu'
import Members from './members'

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

    // this.initFirebase();

    // this.loadMessages();

    this.initFirebase();

    this._loginByGoogle = this._loginByGoogle.bind(this);
  }

  initFirebase() {
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  //  子からのイベントに反応してGoogleアカウントでログイン
  _loginByGoogle() {
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
        <Header accountInfo =
                  {{_loginByGoogle : this._loginByGoogle}} />

        <Grid>
          <Row>
            <Col md={3}>
              <SideMenu />
            </Col>
            <Col md={9}>
              <Tabs defaultActiveKey={1}>
                <Tab eventKey={1} title="Start">
                  <Members />
                </Tab>
                <Tab eventKey={2} title="Sub"></Tab>
                <Tab eventKey={3} title="Other"></Tab>
              </Tabs>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}