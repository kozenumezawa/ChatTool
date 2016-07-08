import React from 'react'

import { Input } from 'react-bootstrap'

export default class memberform extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="chat-box">
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
      </div>
    );
  }
}