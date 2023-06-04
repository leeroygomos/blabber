import React from "react";
import './Messages.css';
import Input from '../Input/Input';

export default function Messages({messages}){
    return(
        <div className='messages-container'>
            <div className='messages'>
                {messages.length > 0 
                    ? messages.map((message) => {
                            return <MessageItem username={message.username} message={message.msg}/>
                        }) 
                    : <p className="placeholder">No messages</p>
                }
            </div>
            <Input/>
        </div>
    );
}

function MessageItem({username, message}){
    return(
        <div className='message-item'>
            <p className='user'>{username}</p>
            <p classname='message'>{message}</p>
        </div>
    );
}