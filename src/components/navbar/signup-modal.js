import React from 'react'

import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'

export default class signup extends React.Component {
  constructor(props) {
    super(props);

    this._close = this._close.bind(this);
    this._signUpByMail = this._signUpByMail.bind(this);
  }

  //  モーダルダイアログを閉じる処理
  _close() {
    this.props.parent_state.action.closeSignUpModal();
  }

  //  登録ボタンが押されたときの処理
  _signUpByMail() {
    this.props.parent_state.action.signUpByMail();
  }

  render() {
    return (
      <div>
        <Modal show={this.props.parent_state.show_sign_up_modal} onHide={this._close}>
          <Modal.Header closeButton>
            <Modal.Title>Chat Toolに新規登録</Modal.Title>
          </Modal.Header>

          <Modal.Body>

          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this._signUpByMail}>ログイン</Button>
            <Button onClick={this._close}>キャンセル</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
