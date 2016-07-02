var HelloWorld = React.createClass({
  render: function() {
    return (
      <p>Hello!World!</p>
    );
  }
});

// id='app'に<HelloWorld />を埋め込む（マウント）
var m = React.render(<HelloWorld />, document.getElementById('app'));