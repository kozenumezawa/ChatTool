export default class EventEmitter {
  constructor() {
    this.handlers = {};
  }

  on(type, handler) {
    if(typeof this.handlers[type] === 'undefined') {
      this.handlers[type] = [];
    }
    this.handlers[type].push(handler);
  }

  emit(type, data) {
    var handlers = this.handlers[type] || [];
    for(var i = 0; i < handlers.length; i++) {
      var handler = handlers[i];
      handler.call(this, data);
    }
  }
}