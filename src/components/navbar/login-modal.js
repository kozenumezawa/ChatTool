import React from 'react'

import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'

import MemberForm from '../memberform'

export default class login extends React.Component {
  constructor(props) {
    super(props);
    propTypes : {
      showModal : React.PropTypes.bool
    }
    this._close = this._close.bind(this);
    this._loginByGoogle = this._loginByGoogle.bind(this);
  }

  //  親へモーダルダイアログを閉じる処理を通知
  _close() {
    this.props.showData._handleCloseLoginModal();
  }

  //  親へGoogleアカウントでログインが押されたことを通知
  _loginByGoogle() {
    this.props.showData._loginByGoogle();
    this._close();
  }

  render() {
    return (
      <div>
        <Modal show={this.props.showData.showModal} onHide={this._close}>
          <Modal.Header closeButton>
            <Modal.Title>Chat Toolにログイン</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <MemberForm />
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

