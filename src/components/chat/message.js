import React from 'react'

export default class message extends React.Component {
  constructor(props) {
    super(props)

    this.render_messages = [];
  }

  //  メッセージの追加(propsの更新)に合わせて、表示するメッセージを変更する
  componentWillReceiveProps(nextProps) {
    //  ルームIDが変わったら、メッセージを全部削除
    if(nextProps.parent_state.room_uid != this.props.parent_state.room_uid) {
      this.render_messages = [];
    }
    

    if(nextProps.parent_state.message != this.props.parent_state.message){
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