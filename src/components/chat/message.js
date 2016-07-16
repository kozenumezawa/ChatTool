import React from 'react'

import { Image } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Row }  from 'react-bootstrap'

import $ from 'jquery'

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
      const message = nextProps.parent_state.message;

      //  発言主によってcssを分ける
      if(message.name == nextProps.parent_state.user_name) {
        //  メッセージか画像かによって処理を分ける
        if (message.body != '') {
          this.render_messages.push(
            <div className="chat-area">
              <div className="hukidashi-me">
                {message.body}
              </div>
            </div>
          );
        } else if(message.imageURL != '') {
          this.render_messages.push(
            <div className="chat-area">
              <Row>
                <Col xs={4} xsOffset={6}>
                  <Image src={message.imageURL} responsive />
                </Col>
              </Row>
            </div>
          );
        }
      } else {
        //  メッセージか画像かによって処理を分ける
        if (message.body != '') {
          this.render_messages.push(
            <div className="chat-area">
              <div className="hukidashi-friend friend">
                {message.body}
              </div>
            </div>
          );
        } else if (message.imageURL != '') {
          this.render_messages.push(
            <div className="chat-area">
              <Row>
                <Col xs={4} >
                  <Image src={message.imageURL} responsive />
                </Col>
              </Row>
            </div>
          );
        }
      }

      $('#message_window').animate({scrollTop: $('#message_window')[0].scrollHeight}, 'fast');  //  一番下までスクロールする
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