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
    this.initFirebase();

    //  データベースの参照開始
    this.commentsRef = firebase.database().ref('messages');
    this.commentsRef.on('child_added', this.loadMessages.bind(this));

    this.showModal = false;

    dispatcher.on('showLoginModal', this.showLoginModal.bind(this));
    dispatcher.on('closeLoginModal', this.closeLoginModal.bind(this));
    dispatcher.on('loginByGoogle', this.loginByGoogle.bind(this));
    dispatcher.on('sendMessage', this.sendMessage.bind(this));
  }

  initFirebase() {
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  //  全メッセージの読み込みと、新規メッセージの読み込み
  loadMessages(data) {
    this.emit('UPDATE_MESSAGE', data.val())
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
    auth.signInWithPopup(provider).then((result) => {
      //  ログイン成功
      this.emit('LOGIN_BY_GOOGLE');
      this.closeLoginModal();
      console.log(firebase.auth().currentUser);

    }).catch(function(error) {
      //  ログイン失敗
    });
  }

  sendMessage(message) {
    const postData = {
      name: firebase.auth().currentUser.displayName,
      body: message
    }
    firebase.database().ref('messages').push(postData);
  }
}