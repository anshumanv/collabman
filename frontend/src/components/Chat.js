import React from 'react';
import axios from 'axios';
import { Chat, addResponseMessage } from 'react-chat-popup';
export default class Redirect extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isTokenRecieved: false,
      token: '',
    };
    this.handleNewUserMessage = this.handleNewUserMessage.bind(this);
  }

  componentWillMount() {
    let params = window.location.search.substr(1);
    let codeParam = params.split('&')[0].split('=')[1];
    console.log(codeParam);
    axios
      .get(
        `https://slack.com/api/oauth.access?client_id=${
          process.env.REACT_APP_SLACK_CLIENT_ID
        }&client_secret=${
          process.env.REACT_APP_SLACK_CLIENT_SECRET
        }&code=${codeParam}`,
      )
      .then(response => {
        console.log(response.data.access_token);
        this.setState({ token: response.data.access_token });
        if (!response.data.access_token) {
          console.log('not now');
        } else {
          this.setState({ isTokenRecieved: true });
        }
      });
    console.log(
      process.env.REACT_APP_SLACK_CLIENT_ID,
      process.env.REACT_APP_SLACK_CLIENT_SECRET,
    );
  }

  componentDidMount() {
    addResponseMessage('Welcome to this awesome chat!');
  }

  handleNewUserMessage(newMessage) {
    console.log(`New message incoming! ${newMessage}`);
    axios
      .post(
        `https://slack.com/api/chat.postMessage?token=${
          this.state.token
        }&channel=CDL733HC4&text=${newMessage}`,
      )
      .then(message => console.log(message));
  }

  handleClick() {
    console.log('magic will happen');
  }

  render() {
    console.log(this.state.token);
    axios
      .get(
        `https://slack.com/api/conversations.history?token=${
          this.state.token
        }&channel=CDL733HC4`,
      )
      .then(response => {
        console.log(response, response.data.messages);
        for (let message in response.data.messages)
          addResponseMessage(
            response.data.messages[response.data.messages.length - 1 - message]
              .text,
          );
      });
    if (!this.state.isTokenRecieved)
      return (
        <a href="https://slack.com/oauth/authorize?scope=channels:read&client_id=414787387841.464240578163">
          <img src="https://api.slack.com/img/sign_in_with_slack.png" />
        </a>
      );
    return (
      <div>
        <Chat handleNewUserMessage={this.handleNewUserMessage} />
      </div>
    );
  }
}
