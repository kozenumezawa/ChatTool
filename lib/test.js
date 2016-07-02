'use strict';

var HelloWorld = React.createClass({
  displayName: 'HelloWorld',

  render: function render() {
    return React.createElement(
      'p',
      null,
      'Hello!World!'
    );
  }
});

// id='app'に<HelloWorld />を埋め込む（マウント）
var m = React.render(React.createElement(HelloWorld, null), document.getElementById('app'));