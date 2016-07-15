import React from 'react'

import { FormGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

import $ from 'jquery'

export default class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textAreaValue: ""
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickSendPicture = this.onClickSendPicture.bind(this);
    this.saveImage = this.saveImage.bind(this);

    this.imageForm = document.getElementById('image-form');
  }

  onChangeText(event) {
    this.setState({ textAreaValue: event.target.value});
  }

  //  親へGoogleアカウントでログインが押されたことを通知
  _loginByGoogle() {
    this.props.parent_state.action.loginByGoogle();
  }
  
  //  送信ボタンが押されたときの処理
  onClick() {
    if(this.state.textAreaValue != "") {
      this.props.parent_state.action.sendMessage(this.state.textAreaValue);
      this.setState({ textAreaValue: ""})
    }
  }

  //  写真を送信ボタンが押されたときの処理
  onClickSendPicture() {
    $('#mediaCapture').click();
  }

  //  選択された写真をアップロードする処理
  saveImage(event) {
    const file = event.target.files[0];

    // ファイルを選択した履歴をフォームから削除する
    const imageForm = document.getElementById('image-form');
    imageForm.reset();

    // 選択されたファイルがイメージファイルが調べる
    if (!file.type.match('image.*')) {
      console.log('not a image file')
      return;
    }

    this.props.parent_state.action.sendImage(file);
  }

  render() {
    return (
      <div>
        <form>
          <FormGroup controlId="formControlsTextarea">
            <FormControl value={this.state.textAreaValue} onChange={this.onChangeText} componentClass="textarea" placeholder="メッセージを入力..." />

            <div className="pull-right">
              <Button onClick={this.onClick}>
                送信
              </Button>
            </div>

            <br/>
            <br/>

            <div className="pull-right">
              <Button onClick={this.onClickSendPicture} className="glyphicon glyphicon-plus" >
                写真を送信
              </Button>
            </div>
          </FormGroup>
        </form>

        <form id="image-form" action="#">
          <FormGroup>
            <input id="mediaCapture" onChange={this.saveImage} type="file" accept="image/*"></input>
          </FormGroup>
      </form>

      </div>
    );
  }
}