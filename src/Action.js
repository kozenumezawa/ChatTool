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
  //  ---Login モーダル関係終わり---


  //  ---SignUp モーダル関係---
  showSignUpModal() {
    this.dispatcher.emit('showSignUpModal');
  }

  closeSignUpModal() {
    this.dispatcher.emit('closeSignUpModal')
  }

  signUpByMail() {
    this.dispatcher.emit('signUpByMail')
  }
  //  ---SignUp モーダル関係終わり---


  logout() {
    this.dispatcher.emit('logout')
  }

  sendMessage(message) {
    this.dispatcher.emit('sendMessage', message)
  }


}