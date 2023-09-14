import React from "react";
import './Messages.css';
import Input from '../Input/Input';

export default function Messages({messages, sendMessage}){
    return(
        <div className='messages-container'>
            <div className='messages'>
                {messages.length > 0 
                    ? messages.toReversed().map((message) => {
                            return <MessageItem username={message.senderName} message={message.message} timestamp={message.createdAt}/>
                        }) 
                    : <p className="placeholder">No messages</p>
                }
            </div>
            <Input sendMessage={sendMessage}/>
        </div>
    );
}

function MessageItem({username, message, timestamp}){
    let date = new Date(timestamp);
    let formattedTimestamp = date.toLocaleDateString('en-US', {timeZone: 'America/Vancouver'}) + ' ' + date.toLocaleTimeString('en-US', {timeZone: 'America/Vancouver'});

    return(
        <div className='message-item'>
            <div className='message-item-header'>
                <p className='user'>{username}</p>
                <p className='timestamp'>{formattedTimestamp}</p>
            </div>
            <p classname='message'>{message}</p>
        </div>
    );
}