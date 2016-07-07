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
    this.state = {
      showModal: false
    };
    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this._handleCloseLoginModal = this._handleCloseLoginModal.bind(this);
  }

  openLoginModal() {
    this.setState({ showModal: true});
  }

  closeLoginModal() {
    this.setState({ showModal: false});
  }

  // 子からの通知を受け取り、モーダルダイアログを閉じる
  _handleCloseLoginModal() {
    this.closeLoginModal();
  }

  render() {
    return (
      <div>
        <LoginModal showData =
                      {{showModal : this.state.showModal,
                        _handleCloseLoginModal : this._handleCloseLoginModal}} />
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Chat Tool</a>
            </Navbar.Brand>
          </Navbar.Header>

          <Nav>
            <NavItem eventKey={1} href="#" onSelect={this.openLoginModal} > ログイン</NavItem>
            <NavItem eventKey={2} href="#"> 新規登録</NavItem>
          </Nav>

          <Nav pullRight>
            <NavDropdown eventKey={5} title="連絡先を追加" >
              <MenuItem eventKey={5.1}>IDで追加</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={5.2}>メールアドレスで追加</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
