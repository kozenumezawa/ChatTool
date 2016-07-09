import React from 'react'

import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'

export default class login extends React.Component {
  constructor(props) {
    super(props);

    this._close = this._close.bind(this);
    this._loginByGoogle = this._loginByGoogle.bind(this);
  }

  //  モーダルダイアログを閉じる処理
  _close() {
    this.props.parent_state.action.closeLoginModal();
  }

  //  Googleアカウントでログインが押されたときの処理
  _loginByGoogle() {
    this.props.parent_state.action.loginByGoogle();
  }

  render() {
    return (
      <div>
        <Modal show={this.props.parent_state.show_login_modal} onHide={this._close}>
          <Modal.Header closeButton>
            <Modal.Title>Chat Toolにログイン</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>

            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this._loginByGoogle}>ログイン</Button>
            <Button onClick={this._close}>キャンセル</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

