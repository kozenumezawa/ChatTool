import Emitter from "./EventEmitter"
import firebase from 'firebase'

export default class Store extends Emitter {
  constructor(dispatcher) {
    super();

    // Firebaseを初期化
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


    //  各stateの初期値設定f
    this.show_login_modal = false;
    this.show_sign_up_modal = false;
    this.user_loggedin = false;
    this.show_add_by_name_modal = false;
    this.find_user = [];

    //  ログイン状況を監視する関数をセット
    firebase.auth().onAuthStateChanged(this.changeLoggedinState.bind(this));

    dispatcher.on('showLoginModal', this.showLoginModal.bind(this));
    dispatcher.on('closeLoginModal', this.closeLoginModal.bind(this));
    dispatcher.on('loginByGoogle', this.loginByGoogle.bind(this));


    dispatcher.on('sendMessage', this.sendMessage.bind(this));

    dispatcher.on('showSignUpModal', this.showSignUpModal.bind(this));
    dispatcher.on('closeSignUpModal', this.closeSignUpModal.bind(this));
    dispatcher.on('signUpByMail', this.signUpByMail.bind(this));

    dispatcher.on('logout', this.logout.bind(this));

    dispatcher.on('openAddByNameModal', this.openAddByNameModal.bind(this));
    dispatcher.on('closeAddByNameModal', this.closeAddByNameModal.bind(this));
    dispatcher.on('searchName', this.searchName.bind(this));
  }

  initFirebase() {
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  changeLoggedinState(user) {
    if (user) {
      // ユーザーログイン時の処理
      //  ユーザー情報をデータベースの/user下に記録(アップデート) sign up時の二重書き込みを防ぐためにif文を用いる
      const current_user = firebase.auth().currentUser;
      if(current_user.displayName != null) {
        const postData = {
          user_uid : current_user.uid,
          user_name : current_user.displayName
        }
        const path = 'users/' + current_user.uid;
        const usersRef =  firebase.database().ref(path);
        usersRef.update(postData);
      }

      //  データベースの参照開始
      this.commentsRef = firebase.database().ref('messages');
      this.commentsRef.on('child_added', this.loadMessages.bind(this));
      this.user_loggedin = true;
    } else {
      this.commentsRef.off('child_added', this.loadMessages.bind(this));
      this.user_loggedin = false;
    }
    this.emit('CHANGE_LOGGEDIN_STATE')
  }

  getLoggedinInfo() {
    return this.user_loggedin;
  }
  //  全メッセージの読み込みと、新規メッセージの読み込み
  loadMessages(data) {
    this.emit('UPDATE_MESSAGE', data.val())
  }

  //  ---Login モーダル関係---
  showLoginModal() {
    this.show_login_modal = true;
    this.emit('LOGIN_MODAL_CHANGE');
  }

  closeLoginModal() {
    this.show_login_modal = false;
    this.emit('LOGIN_MODAL_CHANGE');
  }

  getLoginModalData() {
    return this.show_login_modal;
  }

  //  Googleアカウントでログイン
  loginByGoogle() {
    var auth = firebase.auth();
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
      //  ログイン成功
      this.closeLoginModal();
    }).catch(function(error) {
      //  ログイン失敗
    });
  }
  //  ---Login モーダル関係終わり---


  //  ---sign up モーダル関係---
  showSignUpModal() {
    this.show_sign_up_modal = true;
    this.emit('SIGN_UP_MODAL_CHANGE')
  }

  closeSignUpModal() {
    this.show_sign_up_modal = false;
    this.emit('SIGN_UP_MODAL_CHANGE')
  }

  signUpByMail(userdata) {
    firebase.auth().createUserWithEmailAndPassword(userdata.mail, userdata.password_value).catch((error) => {
      // エラー処理
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('can not sign in')
      console.log(errorCode);
      console.log(errorMessage);
    }).then(() => {
      //  ユーザープロフィールに名前を追加
      let current_user = firebase.auth().currentUser;
      current_user.updateProfile({
        displayName: userdata.name
      });
      //  ユーザー情報をデータベースの/user下に記録(アップデート)
      current_user = firebase.auth().currentUser;
      const postData = {
        user_uid : current_user.uid,
        user_name : userdata.name
      }
      const path = 'users/' + current_user.uid;
      const usersRef =  firebase.database().ref(path);
      usersRef.update(postData);
    });

    this.closeSignUpModal();
  }

  getSignUpModalData() {
    return this.show_sign_up_modal;
  }
  //  ---sign up モーダル関係終わり---

  //  ---連絡先を追加 モーダル関係---
  openAddByNameModal() {
    this.show_add_by_name_modal = true;
    this.emit('ADD_BY_NAME_MODAL_CHANGE')
  }

  closeAddByNameModal() {
    this.show_add_by_name_modal = false;
    this.emit('ADD_BY_NAME_MODAL_CHANGE')
  }

  getAddByNameModal() {
    return this.show_add_by_name_modal;
  }

  searchName(name) {
    //  users/以下の全データを読み込み、検索に一致する名前がないか検索
    firebase.database().ref('users').once('value').then( (snapshot) => {
      const users = snapshot.val();
      Object.keys(users).forEach( (element, index) => {
        const user = users[element];  //  ユーザー情報を所得
        if(name == user.user_name){
          this.find_user.push(user);
        }
      });
      this.emit('END_SEARCH_NAME', this.find_user);
      this.find_user = [];
    });

  }
  //  ---連絡先を追加 モーダル関係終わり---

  sendMessage(message) {
    const postData = {
      name: firebase.auth().currentUser.displayName,
      body: message
    }
    if(postData.body != ""){
      firebase.database().ref('messages').push(postData);
    }
  }

  logout() {
    firebase.auth().signOut().then(() => {

    }, (error) => {
      //  ログインできなかったときの処理
    });
  }
}