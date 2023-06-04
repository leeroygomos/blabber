import { useState } from "react";
import './Tabs.css';
import Messages from '../Messages/Messages';

const tabColors = ['aqua', 'pink', 'orange', 'lime','lavender'];

export default function Tabs({tabNames}){
    const [currentTab, setCurrentTab] = useState(0);
    const messages = [{username:'froggers', msg:'im THICC AF'}, {username:'pip', msg:'wassap'}]

    return(
        <div className='tab'>
            <div className='tab-header-container'>
                <TabHeader tabNames={tabNames} setCurrentTab={setCurrentTab}/>
            </div>
            <div className='tab-body' style={{backgroundColor:tabColors[currentTab]}}>
                <Messages messages={messages}/>
            </div>
        </div>
    );
}

function TabHeader({tabNames, setCurrentTab}){
    return(
        (
            tabNames.map((tabName, index) => {
                let tabColor = tabColors[index];
                return (
                    <div className='tab-header' style={{backgroundColor:tabColor}} onClick={() => setCurrentTab(index)}>
                        <h1>{tabName}</h1>
                    </div>
                    )
                }
            )
        )
    );
}