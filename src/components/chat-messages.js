import React from 'react'

import MessageForm from './chat/MessageForm'
import Message from './chat/message'

export default class memberform extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="scroll-chat-field">
            <Message parent_state = { this.props.parent_state } />
        </div>
        <MessageForm parent_state = { this.props.parent_state } />
      </div>
    );
  }
}