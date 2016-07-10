import React from 'react'

import { Nav } from 'react-bootstrap'
import { NavItem } from 'react-bootstrap'

export default class ContactList extends React.Component {
  constructor(props) {
    super(props);

    this.render_contact = [];
  }

  //  検索によって得たユーザーデータに合わせて、表示するテーブルを変える
  componentWillReceiveProps(nextProps) {
    if(nextProps.parent_state.contact_list != this.props.parent_state.contact_list){
      this.render_contact = [];

      nextProps.parent_state.contact_list.forEach((element, index) => {
        this.render_contact.push(
          <NavItem eventKey={ index } href="#">
            { element.friend_name }
          </NavItem>
        );
      });
    }
  }

  render() {
    const active_key = 0;
    return (
      <Nav bsStyle="pills" activeKey={ active_key } stacked>
        <NavItem eventKey={ active_key } href="#">
          連絡先リスト
        </NavItem>
        { this.render_contact }
      </Nav>
    );
  }
}
