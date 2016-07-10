import React from 'react'

import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { ControlLabel } from 'react-bootstrap'


export default class login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mail : '',
      password_value : ''
    };

    this._close = this._close.bind(this);
    this._loginByGoogle = this._loginByGoogle.bind(this);
    this._loginByMail = this._loginByMail.bind(this);

    this.getPasswordState = this.getPasswordState.bind(this);
    this.handleMailChange = this.handleMailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  //  モーダルダイアログを閉じる処理
  _close() {
    this.props.parent_state.action.closeLoginModal();
    this.setState({
      mail: '',
      password_value: ''
    });
  }

  //  Googleアカウントでログインが押されたときの処理
  _loginByGoogle() {
    this.props.parent_state.action.loginByGoogle();
    this._close();
  }

  _loginByMail() {
    if(this.state.mail != '' && this.state.password_value != ''){
      this.props.parent_state.action.loginByMail(this.state);
      this._close();
    }
  }
  getPasswordState() {
    if(this.state.password_value != '') {
      const pattern = new RegExp(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,16}$/, 'i');
      if(pattern.test(this.state.password_value)) {
        return 'success';
      } else {
        return 'error';
      }
    }
  }

  handleMailChange(event) {
    this.setState({ mail: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password_value: event.target.value });
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
              <FormGroup controlId="formControlsEmail">
                <ControlLabel>メールアドレス</ControlLabel>
                <FormControl type="email" placeholder="" onChange={this.handleMailChange}/>
              </FormGroup>
              <FormGroup controlId="formControlsPassword" validationState={this.getPasswordState()}>
                <ControlLabel>パスワード (半角英数 6文字以上 16文字以下)</ControlLabel>
                <FormControl type="password" onChange={this.handlePasswordChange}/>
                <FormControl.Feedback />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this._loginByGoogle}>Googleアカウントでログイン</Button>
            <Button bsStyle="primary" onClick={this._loginByMail}>ログイン</Button>
            <Button onClick={this._close}>キャンセル</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

