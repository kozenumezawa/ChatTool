export default class Action {
   constructor(dispatcher) {
     this.dispatcher = dispatcher;
   }

  showLoginModal() {
    this.dispatcher.emit('showLoginModal');
  }

  closeLoginModal() {
    this.dispatcher.emit('closeLoginModal')
  }

  loginByGoogle() {
    this.dispatcher.emit('loginByGoogle');
  }

  sendMessage(message) {
    this.dispatcher.emit('sendMessage', message)
  }
}