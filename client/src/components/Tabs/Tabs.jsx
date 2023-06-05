import { useState } from "react";
import './Tabs.css';
import Messages from '../Messages/Messages';

const tabColors = ['#8CD6FF', '#CE7F7F', '#F8F4D0', '#9CA6FF','#A7FF9F'];

export default function Tabs({activeChats}){
    const [currentTab, setCurrentTab] = useState(0);
    const [messages, setMessages] = useState(activeChats[0].messages);

    return(
        <div className='tab'>
            <div className='tab-header-container'>
                <TabHeader activeChats={activeChats} setCurrentTab={setCurrentTab} setMessages={setMessages}/>
            </div>
            <div className='tab-body' style={{backgroundColor:tabColors[currentTab]}}>
                <Messages messages={messages}/>
            </div>
        </div>
    );
}

function TabHeader({activeChats, setCurrentTab, setMessages}){
    return(
        (
            activeChats.map((chat, index) => {
                let tabColor = tabColors[index];
                return (
                    <div className='tab-header' style={{backgroundColor:tabColor}} onClick={() => {setCurrentTab(index); setMessages(activeChats[index].messages)}}>
                        {chat.user}
                    </div>
                    )
                }
            )
        )
    );
}