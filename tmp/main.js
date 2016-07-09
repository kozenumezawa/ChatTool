class ChatClass{
  constructor() {

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

    this.send_message = document.getElementById('sendMessage');
    this.login_button = document.getElementById('loginButton');


    this.send_message.addEventListener('click', this.saveMessage.bind(this));
    this.login_button.addEventListener('click', this.loginByGoogle.bind(this));

    this.initFirebase();

    this.loadMessages();
  }

  initFirebase() {
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
  }


  //  googleアカウントでログイン
  loginByGoogle(googleUser) {
    $('#loginModal').modal('hide');
    var auth = firebase.auth();
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(function(result) {
      //  ログイン成功
    }).catch(function(error) {
      //  ログイン失敗
    });
  }

  //  全メッセージの読み込みと、新規メッセージの読み込み
  loadMessages() {
    var setMessage = function(data) {
      var msg = data.val();
      $('<li>').text(msg.name + ': ' + msg.body).prependTo('#messages');
    }.bind(this);
  
     this.messagesRef.limitToLast(12).on('child_added', setMessage);
  }


  //  メッセージを投稿
  saveMessage() {
    let currentUser = this.auth.currentUser;
    this.messagesRef.push({
      name: currentUser.displayName,
      body: $('#message').val()
    },function (error) {
      console.log(error);
    });
  }
}

window.onload = function() {
  window.ChatTool = new ChatClass();
};


