import React from 'react'

export default class message extends React.Component {
  constructor(props) {
    super(props)

    this.render_messages = [];
    this.render_stack = [];
  }

  //  メッセージの追加(propsの更新)に合わせて、表示するメッセージを変更する
  componentWillReceiveProps(nextProps) {
    //  ルームIDが変わったら、メッセージを全部削除
    var change_flag = false;

    if(nextProps.parent_state.room_uid != this.props.parent_state.room_uid) {
      change_flag = true;
      const room_uid = this.props.parent_state.room_uid;
      const talk_object = {
         key : room_uid,
         data : this.render_messages
      };

      this.render_stack.push(talk_object);

      this.render_messages = [];

      const next_uid = nextProps.parent_state.room_uid;
      var i = 0;
      for(i ; i < this.render_stack.length; i++) {
        if(this.render_stack[i].key == next_uid){
          this.render_messages = this.render_stack[i].data;
          break;
        }
      }
      this.render_stack[i] = [];
    }

    if(change_flag == false && nextProps.parent_state.message != this.props.parent_state.message){
      //  発言主によってCSSを分ける
      if(nextProps.parent_state.message.name == nextProps.parent_state.user_name) {
        this.render_messages.push(
          <div className="chat-area">
            <div className="hukidashi-me">
              {nextProps.parent_state.message.body}
            </div>
          </div>
        );
      } else {
        this.render_messages.push(
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