import React, { useState } from "react";
import './Dropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Dropdown({title, list}){

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    const openModal = () => {
        // open either 1. modal to add a friend or 2. modal to add a group
        console.log("open add modal");
    }

    const openChat = () => {
        // open chat with selected username/group
        console.log("open chat");
    }

    return(
        <div className="dropdown">
            <button className="toggle-btn" onClick={ toggleOpen }>
                {isOpen ? <div>
                        <span><FontAwesomeIcon icon={faCaretDown} style={{color: "#ffffff",}} /></span>
                        <span className="title">{ title }</span>
                    </div> : <div>
                        <span><FontAwesomeIcon icon={faCaretRight} style={{color: "#ffffff",}} /></span>
                        <span className="title">{ title }</span>
                    </div>}
                <span><button className="add-btn" onClick={openModal}><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} /></button></span>
            </button>
            {isOpen ? <div className="dropdown-list">
                <ul>
                    {list.map((item, index) => {
                        return <li key={index} onClick={openChat}>
                                    <img src={item.img} alt="avatar" />
                                    <div className="info">
                                        <div className="username">{item.name}</div>
                                        <div>{item.bio ? item.bio : ""}</div>
                                    </div>
                                </li>
                    })}
                </ul>
            </div> : <></>}
        </div>
    );
}