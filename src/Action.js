export default class Action {
   constructor(dispatcher) {
     this.dispatcher = dispatcher;
   }

  //  ---Login モーダル関係---
  showLoginModal() {
    this.dispatcher.emit('showLoginModal');
  }

  closeLoginModal() {
    this.dispatcher.emit('closeLoginModal')
  }

  loginByGoogle() {
    this.dispatcher.emit('loginByGoogle');
  }

  loginByMail(userdata) {
    this.dispatcher.emit('loginByMail', userdata);
  }
  //  ---Login モーダル関係終わり---


  //  ---SignUp モーダル関係---
  showSignUpModal() {
    this.dispatcher.emit('showSignUpModal');
  }

  closeSignUpModal() {
    this.dispatcher.emit('closeSignUpModal')
  }

  signUpByMail(userdata) {
    this.dispatcher.emit('signUpByMail',userdata)
  }
  //  ---SignUp モーダル関係終わり---


  logout() {
    this.dispatcher.emit('logout')
  }

  sendMessage(message) {
    this.dispatcher.emit('sendMessage', message)
  }

  //  ---連絡先を追加 モーダル関係---
  openAddByNameModal() {
    this.dispatcher.emit('openAddByNameModal')
  }

  closeAddByNameModal() {
    this.dispatcher.emit('closeAddByNameModal')
  }

  searchName(name) {
    this.dispatcher.emit('searchName', name)
  }

  addContact(user) {
    this.dispatcher.emit('addContact', user)
  }
  //  ---連絡先を追加 モーダル関係終わり---

  changeTalk(user) {
    this.dispatcher.emit('changeTalk', user)
  }

  closeErrorModal() {
    this.dispatcher.emit('closeErrorModal')
  }
}