window.onload = function() {

// データベースの参照を準備
  var firebaseRef = new Firebase("https://chattool-5a67b.firebaseio.com/"); // ... 1
  var messagesRef = firebaseRef.child('messages'); // ... 2

// 既存メッセージを表示
  messagesRef.on('child_added', function(snapshot) { // ... 3
    var msg = snapshot.val();
    $('<li>').text(msg.name + ': ' + msg.body).prependTo('#messages');
  });

  $('#sendMessage').click(function() {
    // 新規メッセージを投稿
    messagesRef.push({ // ... 4
      name: 'test',
      body: $('#message').val()
    });
  });
};


