import React from 'react'

import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { MenuItem } from 'react-bootstrap'
import { NavItem } from 'react-bootstrap'

import LoginModal from './login-modal'

export default class header extends React.Component {
  constructor(props) {
    super(props);
    this._openLoginModal = this._openLoginModal.bind(this);
    this._loginByGoogle = this._loginByGoogle.bind(this);
  }

  //  ログインが押されたときの処理
  _openLoginModal() {
    this.props.parent_state.action.showLoginModal();
  }

  //  親へGoogleアカウントでログインが押されたことを通知
  _loginByGoogle() {
    this.props.parent_state.action.loginByGoogle();
  }

  render() {
    return (
      <div>
        <LoginModal parent_state = { this.props.parent_state } />
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Chat Tool</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#" onSelect={this._openLoginModal} > Googleアカウントでログイン</NavItem>
              <NavItem eventKey={2} href="#"> 新規登録</NavItem>
            </Nav>

            <Nav pullRight>
              <NavDropdown eventKey={5} title="連絡先を追加" >
                <MenuItem eventKey={5.1}>IDで追加</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={5.2}>メールアドレスで追加</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
