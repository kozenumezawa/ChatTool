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

    this.contact_list = [];

    //  各stateの初期値設定
    this.show_login_modal = false;
    this.show_sign_up_modal = false;
    this.user_loggedin = false;
    this.show_add_by_name_modal = false;
    this.find_user = [];
    this.room_path = '';
    this.room_uid = '';
    this.user_name = '';

    //  ログイン状況を監視する関数をセット
    firebase.auth().onAuthStateChanged(this.changeLoggedinState.bind(this));

    dispatcher.on('showLoginModal', this.showLoginModal.bind(this));
    dispatcher.on('closeLoginModal', this.closeLoginModal.bind(this));
    dispatcher.on('loginByGoogle', this.loginByGoogle.bind(this));
    dispatcher.on('loginByMail', this.loginByMail.bind(this));

    dispatcher.on('sendMessage', this.sendMessage.bind(this));
    dispatcher.on('sendImage', this.sendImage.bind(this));

    dispatcher.on('showSignUpModal', this.showSignUpModal.bind(this));
    dispatcher.on('closeSignUpModal', this.closeSignUpModal.bind(this));
    dispatcher.on('signUpByMail', this.signUpByMail.bind(this));

    dispatcher.on('logout', this.logout.bind(this));

    dispatcher.on('openAddByNameModal', this.openAddByNameModal.bind(this));
    dispatcher.on('closeAddByNameModal', this.closeAddByNameModal.bind(this));
    dispatcher.on('searchName', this.searchName.bind(this));
    dispatcher.on('addContact', this.addContact.bind(this));

    dispatcher.on('changeTalk', this.changeTalk.bind(this));
    dispatcher.on('closeErrorModal', this.closeErrorModal.bind(this));

    this.getContactList = this.getContactList.bind(this);
  }

  getUserName() {
    return this.user_name;
  }

  changeLoggedinState(user) {
    if (user) {
      // ユーザーログイン時の処理
      const current_user = user;

      //  ユーザー情報をデータベースの/user下に記録 (アップデート)。
      // Google認証を用いた場合は、デフォルトでユーザー名が 所得できるので、そのユーザー名を記録
      if(current_user.displayName != null) {
        this.user_name = current_user.displayName;
        this.emit('CHANGE_NAME');
        const postData = {
          user_uid : current_user.uid,
          user_name : current_user.displayName
        }
        const path = 'users/' + current_user.uid;
        const usersRef =  firebase.database().ref(path);
        usersRef.update(postData);

        //  連絡先リストの監視を開始
        this.monitorRoomList(current_user);

        //  連絡先があるか検索し、ある場合、連絡先の一番上の人のチャットメッセージを所得
        firebase.database().ref('users/' + current_user.uid + '/list/').once('value').then( (snapshot) => {
          const my_uid = firebase.auth().currentUser.uid;
          const users = snapshot.val();
          Object.keys(users).forEach( (element, index) => {
            const user = users[element];  //  ユーザー情報を所得
            if(index == 0) {
              //  データベースの参照開始
              this.changeTalk(user);
            }
          });
        });
      }
      this.user_loggedin = true;
    } else {
      this.user_loggedin = false;
      this.contact_list = [];

      this.stopMonitorRoomList();
      this.emit('GET_CONTACT');
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

  loginByMail(userdata){
    var auth = firebase.auth();
    firebase.auth().signInWithEmailAndPassword(userdata.mail, userdata.password_value).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      const error_data = {
        state : 'login',
        errorCode : errorCode,
        errorMessage : errorMessage
      }
      this.emit('ERROR', error_data);
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
      const error_data = {
        state : 'signup',
        errorCode : errorCode,
        errorMessage : errorMessage
      }
      this.emit('ERROR', error_data);
    }).then(() => {
      //  ユーザープロフィールに名前を追加
      let current_user = firebase.auth().currentUser;
      if(current_user){
        current_user.updateProfile({
          displayName: userdata.name
        }).then(() => {
          //  displayName更新後に、ユーザー情報をデータベースの/user下に記録(アップデート)
          current_user = firebase.auth().currentUser;
          const postData = {
            user_uid : current_user.uid,
            user_name : userdata.name
          };

          this.user_name = userdata.name;

          const path = 'users/' + current_user.uid;
          const usersRef =  firebase.database().ref(path);
          usersRef.update(postData);
          this.emit('CHANGE_NAME');

          this.changeLoggedinState(current_user); //  displayNameが更新された後に、明示的に呼び出し更新する
        });
      }
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
      const my_uid = firebase.auth().currentUser.uid;

      const users = snapshot.val();
      Object.keys(users).forEach( (element, index) => {
        const user = users[element];  //  ユーザー情報を所得
        if(name == user.user_name && user.user_uid != my_uid){
          this.find_user.push(user);
        }
      });
      this.emit('END_SEARCH_NAME', this.find_user);
      this.find_user = [];
    });

  }

  //  新しくrooms/下にroomを作り、自分と相手に連絡先を追加する
  addContact(user) {
    const friend_uid = user.user_uid;
    const friend_name = user.user_name;

    //  自分と相手の連絡先を追加
    const current_user = firebase.auth().currentUser;
    const my_uid = current_user.uid;

    //  新しくルームを作る ルームidは、自分と相手のuidをつなげる
    const room_uid = my_uid + friend_uid;
    const room_post_data = {
      room_uid : room_uid
    }
    const room_path = 'rooms/' + room_uid;
    const room_ref = firebase.database().ref(room_path);
    room_ref.update(room_post_data)

    //  自分の連絡先リストデータベースを更新
    const my_post_data = {
      friend_name : friend_name,
      friend_uid : friend_uid,
      room_uid : room_uid
    }
    const my_path = 'users/' + my_uid + '/list/' + friend_uid;
    const my_ref = firebase.database().ref(my_path);
    my_ref.update(my_post_data)

    //  相手の連絡先リストデータベースを更新
    const friend_post_data = {
      friend_name : current_user.displayName,
      friend_uid : my_uid,
      room_uid : room_uid
    }
    const friend_path = 'users/' + friend_uid + '/list/' + my_uid;
    const friend_ref = firebase.database().ref(friend_path);
    friend_ref.update(friend_post_data);
  }

  getContactList() {
    return this.contact_list;
  }
  //  ---連絡先を追加 モーダル関係終わり---

  //  ---連絡先リスト 関係---
  //  カレントユーザーの連絡先リストを監視し、連絡先が追加された時はイベントを発行する
  monitorRoomList(current_user) {
    const path = 'users/' + current_user.uid + '/list/';
    this.listRef = firebase.database().ref(path);
    this.listRef.on('child_added', this.contactAdded.bind(this))
  }

  contactAdded() {
    const current_user = firebase.auth().currentUser;
    this.contact_list = [];

    //  ログインしているときに、コンタクトリストを返す
    if(current_user) {
      //  データベースのデータからコンタクトリストを作成する
      const my_uid = current_user.uid;
      const contact_path = 'users/' + my_uid + '/list/';
      firebase.database().ref(contact_path).once('value').then( (snapshot) => {
        this.contact_list = [];
        const users = snapshot.val();
        Object.keys(users).forEach( (element, index) => {
          const friend_user = users[element];  //  フレンドリストを所得
          this.contact_list.push(friend_user);
        });
      }).then(() => {
        this.emit('GET_CONTACT');

        //  チャット相手がいないとき、追加された相手をチャット相手に自動選択する
        if(this.room_path == ''){
          firebase.database().ref('users/' + current_user.uid + '/list/').once('value').then( (snapshot) => {
            const users = snapshot.val();
            Object.keys(users).forEach( (element, index) => {
              const user = users[element];  //  ユーザー情報を所得
              this.changeTalk(user);        //  データベースの参照開始
            });
          });
        }
      });
    } else {
      this.emit('GET_CONTACT');
    }
  }

  stopMonitorRoomList() {
    if(typeof(this.listRef) != 'undefined') {
      this.listRef.off('child_added');
    }
  }
  //  ---連絡先リスト 関係終わり---

  //  チャット相手を更新する処理
  changeTalk(user) {
    if(this.room_path != ''){
      //  以前のルームのデータの監視をやめる
      this.commentsRef = firebase.database().ref(this.room_path);
      this.commentsRef.off('child_added');
    }
    this.room_uid = user.room_uid;  //  現在のルームの更新
    this.emit('CHANGE_ROOM');

    //  データベースの参照開始
    this.room_path = 'rooms/' + user.room_uid + '/messages/';
    this.commentsRef = firebase.database().ref(this.room_path);
    this.commentsRef.on('child_added', this.loadMessages.bind(this));
  }

  /// ---連絡先リスト関係 終わり---
  getRoomUid() {
    return this.room_uid;
  }

  sendMessage(message) {
    const postData = {
      name: firebase.auth().currentUser.displayName,
      body: message,
      image: ''
    }
    if(postData.body != '' && this.room_path != '' ){
      firebase.database().ref(this.room_path).push(postData);
    }
  }

  sendImage(file) {
    if(this.room_path != '') {
      var storageRef = firebase.storage().ref();

      //  ファイルのメタデータを作成
      const metadata = {
        contentType: 'image'
      };

      // ファイルを指定したパスにアップロード
      const upload_path = 'images/' + this.room_uid + '/' + Date.now() + file.name;
      const uploadTask = storageRef.child(upload_path).put(file, metadata);

      //  ファイルをアップロードする処理
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, (error) => {
          console.log(error.code);
        }, () => {
          const downloadURL = uploadTask.snapshot.downloadURL;

          //  ダウンロードURLをデータベースに記録
          const postData = {
            name: firebase.auth().currentUser.displayName,
            body: '',
            imageURL: downloadURL
          }
          if(this.room_path != '' ){
            firebase.database().ref(this.room_path).push(postData);
          }
        }
      );
    }
  }

  logout() {
    firebase.auth().signOut().then(() => {
      //  ログアウト成功時、各stateを初期化
      this.room_path = '';
      this.room_uid = '';
      this.user_name = '';
    }, (error) => {
      //  ログインできなかったときの処理
    });
  }

  closeErrorModal() {
    this.emit('CLOSE_ERROR_MODAL');
  }
}