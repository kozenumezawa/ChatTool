class ChatClass{
  constructor() {
    // データベースの参照を準備
    this.firebaseRef = new Firebase("https://chattool-5a67b.firebaseio.com/");
    this.messagesRef = this.firebaseRef.child('messages');

    this.send_message = document.getElementById('sendMessage');
    this.login_button = document.getElementById('loginButton');


    this.send_message.addEventListener('click', this.saveMessage.bind(this));
    this.login_button.addEventListener('click', this.loginByGoogle.bind(this));

    this.loadMessages();

    this.initFirebase();
  }

  initFirebase() {
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
  }

  //  ログイン、ログアウト時の処理
  onAuthStateChanged(user) {
    if(user) {
      //  ログイン時
      let userName = user.displayName;
      // this.loadMessages();
    } else {
      //ログアウト時
    }
  }

  //  googleアカウントでログイン
  loginByGoogle(googleUser) {
    $('#loginModal').modal('hide');
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
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
    });
  }
}

window.onload = function() {
  window.ChatTool = new ChatClass();
};


