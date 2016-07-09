import React from 'react'

import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { MenuItem } from 'react-bootstrap'
import { NavItem } from 'react-bootstrap'

import LoginModal from './login-modal'
import SignUpModal from './signup-modal'

export default class header extends React.Component {
  constructor(props) {
    super(props);
    this._openLoginModal = this._openLoginModal.bind(this);
    this._openSignUpModal = this._openSignUpModal.bind(this);
    this._logout = this._logout.bind(this);
  }

  //  ログインが押されたときの処理
  _openLoginModal() {
    this.props.parent_state.action.showLoginModal();
  }

  //  会員登録が押されたときの処理
  _openSignUpModal() {
    this.props.parent_state.action.showSignUpModal();
  }

  //  ログアウトが押されたときの処理
  _logout() {
    this.props.parent_state.action.logout();
  }

  //  ログイン中かどうかでrender()の内容を変える
  render() {
    if(this.props.parent_state.logged_in == true) {
      //  ログイン中の処理
      return (
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">Chat Tool</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#" onSelect={this._logout} > ログアウト</NavItem>
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
    } else {
      //  ログイン中でない場合の処理
      return (
        <div>
          <LoginModal parent_state = { this.props.parent_state } />
          <SignUpModal parent_state = { this.props.parent_state } />
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
                <NavItem eventKey={2} href="#" onSelect={this._openSignUpModal}> 新規登録</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
    }
  }
}
