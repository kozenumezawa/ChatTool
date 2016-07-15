import React from 'react'

import MessageForm from './chat/MessageForm'
import Message from './chat/message'

export default class memberform extends React.Component {
  constructor(props) {
    super(props)
  }

  //  ログイン中かどうかでrender()の内容を変える
  render() {
    if(this.props.parent_state.logged_in == true) {
      //  ログイン中の処理
      return (
        <div>
          <div id="message_window" className="scroll-chat-field">
            <Message parent_state={ this.props.parent_state }/>
          </div>
          <MessageForm parent_state={ this.props.parent_state }/>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}