class ChatClass{
  constructor() {
    // データベースの参照を準備
    var firebaseRef = new Firebase("https://chattool-5a67b.firebaseio.com/");
    this.messagesRef = firebaseRef.child('messages');

    this.send_message = document.getElementById('sendMessage');
    this.login_button = document.getElementById('loginButton');


    this.send_message.addEventListener('click', this.saveMessage.bind(this));
    this.login_button.addEventListener('click', this.loginByGoogle.bind(this));

    this.messagesRef.on('child_added', this.loadMessages.bind(this));

    this.initFirebase();
  }

  initFirebase() {
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  //  googleアカウントでログイン
  loginByGoogle(googleUser) {
    let provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
  }


  //  メッセージを表示
  loadMessages(data) {
    var msg = data.val();
    $('<li>').text(msg.name + ': ' + msg.body).prependTo('#messages');
  }

  //  メッセージを投稿
  saveMessage() {
    this.messagesRef.push({
      name: 'test',
      body: $('#message').val()
    });
  }


  //  ログイン認証
  
}

window.onload = function() {
  window.ChatTool = new ChatClass();
};


