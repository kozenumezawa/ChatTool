import React from 'react'

export default class message extends React.Component {
  constructor(props) {
    super(props)

    this.render_messages = [];
  }

  //  メッセージの追加(propsの更新)に合わせて、表示するメッセージを変更する
  componentWillReceiveProps(nextProps) {
    if(nextProps.parent_state.message.body != this.props.parent_state.message.body){
      this.render_messages.push(
        <div className="chat-area">
          <div className="chat-hukidashi">
            {nextProps.parent_state.message.body}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.render_messages}
        <div className="chat-area">
          <div className="chat-hukidashi">
            ふきだしなのですーふきだしですーふきだー
          </div>
        </div>

        <div className="chat-box">
          <div className="chat-area">
            <div className="chat-hukidashi someone">
              ふきだしだよ
            </div>
          </div>
        </div>

       </div>
    );
  }
}