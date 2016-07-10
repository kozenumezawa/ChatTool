import React from 'react'

import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'


export default class errormodal extends React.Component {
  constructor(props) {
    super(props);
    this.error_message = [];

    this._close = this._close.bind(this);
  }

  //  モーダルダイアログを閉じる処理
  _close() {
    this.props.parent_state.action.closeErrorModal();
    this.error_message = [];
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.parent_state.show_error_modal == true) {
      this.error_message.push(
        <div>
          { '申し訳ございません。エラーが発生しました。' } <br/>
          { 'エラーコード: '}
          { nextProps.parent_state.error_data.errorCode }<br/>
          { 'エラーメッセージ: '}
          { nextProps.parent_state.error_data.errorMessage }<br/>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Modal show={this.props.parent_state.show_error_modal} onHide={this._close}>
          <Modal.Header closeButton>
            <Modal.Title>エラーが起きました</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            { this.error_message }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this._close}>OK</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

