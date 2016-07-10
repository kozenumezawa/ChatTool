import React from 'react'

import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { ControlLabel } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

export default class addcontact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name : ''
    };

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


  render() {
    return (
      <div>
        <Modal show={this.props.parent_state.show_add_by_name_modal} onHide={this._close}>
          <Modal.Header closeButton>
            <Modal.Title>名前で連絡先を追加</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form inline>
              <FormGroup controlId="formControlsEmail">
                <ControlLabel>名前を入力(半角英数)</ControlLabel>
                {' '}
                <FormControl type="text" placeholder="" onChange={this.handleNameChange}/>
              </FormGroup>
              <Button  onClick={this._searchName}>
                検索
              </Button>
            </Form>
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