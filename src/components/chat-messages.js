import React from 'react'

import Textcontainer from './chat/textcontainer'

export default class memberform extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="scroll-chat-field">
          <div className="mdl-card__supporting-text mdl-color-text--grey-600">
            <div id="messages">
              <span id="message-filler"></span>
              <div className="chat-area">
                <div className="chat-hukidashi">
                  ふきだしなのですーふきだしですーふきだー
                </div>
              </div>
            </div>

            <div className="chat-box">
              <div className="chat-area">
                <div className="chat-hukidashi someone">
                  ふきだしだよ
                </div>
              </div>
            </div>

            <div className="chat-box">
              <div className="chat-area">
                <div className="chat-hukidashi someone">
                  ふきだしだよ
                </div>
              </div>
            </div>

            <div className="chat-box">
              <div className="chat-area">
                <div className="chat-hukidashi someone">
                  ふきだしだよ
                </div>
              </div>
            </div>

            <div className="chat-box">
              <div className="chat-area">
                <div className="chat-hukidashi someone">
                  ふきだしだよ
                </div>
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
        </div>
        <Textcontainer />
      </div>
    );
  }
}