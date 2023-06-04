import React from "react";
import './Chat.css'
import Tabs from '../Tabs/Tabs';

export default function Chat({activeChats}){
    return(
        <div className="chat">
            {
                activeChats.length > 0 
                ? 
                <Tabs activeChats={activeChats}/>
                : 
                <div className='placeholder'>
                    <p>You have no friends</p>
                </div>
            }
        </div>
    );
}