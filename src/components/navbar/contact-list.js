import React from 'react'

import { Nav } from 'react-bootstrap'
import { NavItem } from 'react-bootstrap'

export default class ContactList extends React.Component {
  constructor(props) {
    super(props);

    this.render_contact = [];
    this.state = {
      active_key : 0
    };

    this.changeTalk = this.changeTalk.bind(this);
  }

  //  検索によって得たユーザーデータに合わせて、表示するテーブルを変える
  componentWillReceiveProps(nextProps) {
    if(nextProps.parent_state.contact_list != this.props.parent_state.contact_list){
      this.render_contact = [];

      nextProps.parent_state.contact_list.forEach((element, index) => {
        this.render_contact.push(
          <NavItem eventKey={ index } onClick={this.changeTalk.bind(this, index, element)} href="#">
            { element.friend_name }
          </NavItem>
        );
      });
    }
  }

  changeTalk(index, user) {
    this.setState({active_key : index });
    this.props.parent_state.action.changeTalk(user);
  }

  render() {
    return (
      <Nav bsStyle="pills" activeKey={ this.state.active_key } stacked>
        <NavItem eventKey={ this.state.active_key } href="#">
          連絡先リスト
        </NavItem>
        { this.render_contact }
      </Nav>
    );
  }
}
