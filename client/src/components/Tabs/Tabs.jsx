import { useState } from "react";
import './Tabs.css';
import Messages from '../Messages/Messages';

const tabColors = ['#8CD6FF', '#CE7F7F', '#F8F4D0', '#9CA6FF','#A7FF9F'];

export default function Tabs({ activeChats, currentTab, setCurrentTab, messages, updateMessages, sendMessage }){

    return(
        <div className='tab'>
            <div className='tab-header-container'>
                <TabHeader activeChats={activeChats} setCurrentTab={setCurrentTab} updateMessages={updateMessages}/>
            </div>
            <div className='tab-body' style={{backgroundColor:tabColors[currentTab]}}>
                <Messages messages={messages} sendMessage={sendMessage}/>
            </div>
        </div>
    );
}

function TabHeader({ activeChats, setCurrentTab, updateMessages }){
    return(
        (   
            activeChats.map((chat, index) => {
                let tabColor = tabColors[index];
                return (
                    <div className='tab-header' style={{backgroundColor:tabColor}} onClick={() => {updateMessages(index); setCurrentTab(index)}}>
                        {chat.chatName}
                    </div>
                    )
                }
            )
        )
    );
}