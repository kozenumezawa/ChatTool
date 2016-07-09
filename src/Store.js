import Emitter from "./EventEmitter"
import firebase from 'firebase'


export default class Store extends Emitter {
  constructor(dispatcher) {
    super();

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



    this.count = 0;
    this.showModal = false;
    dispatcher.on('showLoginModal', this.showLoginModal.bind(this));
    dispatcher.on('closeLoginModal', this.closeLoginModal.bind(this));
    dispatcher.on('loginByGoogle', this.loginByGoogle.bind(this));
  }

  initFirebase() {
    this.database = firebase.database();
    this.storage = firebase.storage();
  }


  showLoginModal() {
    this.showModal = true;
    this.emit('LOGIN_MODAL_CHANGE');
  }

  closeLoginModal() {
    this.showModal = false;
    this.emit('LOGIN_MODAL_CHANGE');
  }

  getLoginModalData() {
    return this.showModal;
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

    this.emit('LOGIN_BY_GOOGLE');
  }
}