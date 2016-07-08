import Emitter from "./EventEmitter"

export default class Store extends Emitter {
  constructor(dispatcher) {
    super();
    this.count = 0;
    this.showModal = false;
    dispatcher.on('showLoginModal', this.showLoginModal.bind(this));
    dispatcher.on('closeLoginModal', this.closeLoginModal.bind(this));
    dispatcher.on('loginByGoogle', this.loginByGoogle.bind(this));
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

  loginByGoogle() {
    this.emit('LOGIN_BY_GOOGLE');
  }
}