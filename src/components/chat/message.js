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
      //  発言主によってcssを分ける
      if(nextProps.parent_state.message.name == nextProps.parent_state.user_name) {
        this.render_messages.unshift(
          <div className="chat-area">
            <div className="hukidashi-me">
              {nextProps.parent_state.message.body}
            </div>
          </div>
        );
      } else {
        this.render_messages.unshift(
          <div className="chat-area">
            <div className="hukidashi-friend friend">
              {nextProps.parent_state.message.body}
            </div>
          </div>
        );
      }

    }
  }
  
  render() {
    return (
      <div>
        {this.render_messages}
       </div>
    );
  }
}