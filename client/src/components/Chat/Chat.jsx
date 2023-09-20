import React from "react";
import './Chat.css'
import Tabs from '../Tabs/Tabs';

export default function Chat({activeChats, currentTab, setCurrentTab, messages, updateMessages, sendMessage, closeTab}){
    return(
        <div className="chat">
            {
                activeChats.length > 0 
                ? 
                <Tabs activeChats={activeChats}
                      currentTab={currentTab} 
                      setCurrentTab={setCurrentTab}
                      messages={messages}
                      updateMessages={updateMessages}
                      sendMessage={sendMessage}
                      closeTab={closeTab}/>
                : 
                <div className='placeholder'>
                    <p>You have no friends</p>
                </div>
            }
        </div>
    );
}