import React from 'react'

import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { ControlLabel } from 'react-bootstrap'

export default class signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name : '',
      mail : '',
      password_value : ''
    };

    this._close = this._close.bind(this);
    this._signUpByMail = this._signUpByMail.bind(this);
    this.getPasswordState = this.getPasswordState.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMailChange = this.handleMailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  //  モーダルダイアログを閉じる処理
  _close() {
    this.props.parent_state.action.closeSignUpModal();
    this.setState({
      name: '',
      mail: '',
      password_value: ''
    });
  }

  //  登録ボタンが押されたときの処理
  _signUpByMail() {
    if(this.state.name != '' && this.state.mail != '' && this.state.password_value != ''){
      this.props.parent_state.action.signUpByMail(this.state);
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

  handleNameChange(event) {
    this.setState({ name: event.target.value });
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
        <Modal show={this.props.parent_state.show_sign_up_modal} onHide={this._close}>
          <Modal.Header closeButton>
            <Modal.Title>Chat Toolに新規登録</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormGroup controlId="formControlsText">
              <ControlLabel>ユーザー名</ControlLabel>
              <FormControl type="text" placeholder="" onChange={this.handleNameChange}/>
            </FormGroup>
            <FormGroup controlId="formControlsEmail">
              <ControlLabel>メールアドレス</ControlLabel>
              <FormControl type="email" placeholder="" onChange={this.handleMailChange}/>
            </FormGroup>
            <FormGroup controlId="formControlsPassword" validationState={this.getPasswordState()}>
              <ControlLabel>パスワード (半角英数 6文字以上 16文字以下)</ControlLabel>
              <FormControl type="password" onChange={this.handlePasswordChange}/>
              <FormControl.Feedback />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this._signUpByMail}>登録</Button>
            <Button onClick={this._close}>キャンセル</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
