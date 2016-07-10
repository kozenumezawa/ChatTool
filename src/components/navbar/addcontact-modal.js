import React from 'react'

import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { ControlLabel } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Table } from 'react-bootstrap'

export default class addcontact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name : ''
    };

    this.render_users = [];

    this._close = this._close.bind(this);
    this._searchName = this._searchName.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  //  モーダルダイアログを閉じる処理
  _close() {
    this.props.parent_state.action.closeAddByNameModal();
  }

  _searchName() {
    const name = this.state.name;
    this.props.parent_state.action.searchName(name);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  //  検索によって得たユーザーデータに合わせて、表示するテーブルを変える
  componentWillReceiveProps(nextProps) {
    if(nextProps.parent_state.searched_user != this.props.parent_state.searched_user){
      this.render_users = [];
      nextProps.parent_state.searched_user.forEach((element, index) => {
        this.render_users.push(
          <tr>
            <td>{ element.user_name }</td>
            <td>{ element.user_uid }</td>
            <td>FW</td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <Modal show={this.props.parent_state.show_add_by_name_modal} onHide={this._close}>
          <Modal.Header closeButton>
            <Modal.Title>ユーザー名で連絡先を追加</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form inline>
              <FormGroup controlId="formControlsEmail">
                <ControlLabel>ユーザー名を入力</ControlLabel>
                {' '}
                <FormControl type="text" placeholder="" onChange={this.handleNameChange}/>
              </FormGroup>
              <Button  onClick={this._searchName}>
                検索
              </Button>
            </Form>
            <Table striped>
              <thead>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Position</th>
              </tr>
              </thead>
              <tbody>
                { this.render_users }
              </tbody>
            </Table>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this._close}>キャンセル</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}