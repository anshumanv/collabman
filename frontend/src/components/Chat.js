import React from 'react'
import axios from 'axios'
import {Chat, addResponseMessage} from 'react-chat-popup'
export default class Redirect extends React.Component {

    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            testingState:true,
        }
        this.handleNewUserMessage = this.handleNewUserMessage.bind(this)
    }
    
    componentWillMount() {
        console.log(process.env.REACT_APP_SLACK_CLIENT_ID,process.env.REACT_APP_SLACK_CLIENT_SECRET)
        axios.post(`https://slack.com/api/conversations.list?token=${process.env.REACT_APP_SLACK_TOKEN}`)
        .then(response => console.log(response))
        axios.get(`https://slack.com/api/conversations.history?token=${process.env.REACT_APP_SLACK_TOKEN}&channel=CDL733HC4`)
        .then(response => {console.log(response,response.data.messages);
                for(let message in response.data.messages)
                    addResponseMessage(response.data.messages[response.data.messages.length - message - 1].text)
            })
    }

    componentDidMount() {
        addResponseMessage("Welcome to this awesome chat!");
      }
     
      handleNewUserMessage (newMessage) {
        console.log(`New message incomig! ${newMessage}`);
        // Now send the message throught the backend API
        //addResponseMessage(response);
        axios.post(`https://slack.com/api/chat.postMessage?token=${process.env.REACT_APP_SLACK_TOKEN}&channel=CDL733HC4&text=${newMessage}`)
        .then(message => console.log(message))
      }

    handleClick () {
        console.log("magic will happen")        
    }
    
    render() {
        
        return (
            <div>
                <Chat
                handleNewUserMessage={this.handleNewUserMessage}
                />
            </div>
        )
    }
}