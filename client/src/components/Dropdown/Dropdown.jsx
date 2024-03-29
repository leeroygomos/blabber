import React, { useState } from "react";
import './Dropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Dropdown({ title, list, openModal, getCurrentChat }){

    const [isOpen, setIsOpen] = useState(true);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    const openChat = (chatId, chatName, userId) => {
        getCurrentChat(chatId, chatName, userId);
    }

    return(
        <div>
            <div className="dropdown">
            <button className="toggle-btn" onClick={ toggleOpen }>
                {isOpen ? <div>
                        <span><FontAwesomeIcon icon={ faCaretDown } style={{ color: "#ffffff", }} /></span>
                        <span className="title">{ title }</span>
                    </div> : <div>
                        <span><FontAwesomeIcon icon={ faCaretRight } style={{ color: "#ffffff", }} /></span>
                        <span className="title">{ title }</span>
                    </div>}
                <span><button className="add-btn" onClick={() => openModal()}><FontAwesomeIcon icon={ faPlus } style={{ color: "#ffffff", }} /></button></span>
            </button>
            {isOpen ? <div className="dropdown-list">
                <ul>
                    {list.map((item) => {
                        return <li key={ item.chatId } onClick = { () => openChat(item.chatId, item.name, item.userId) }>
                                    <img className="list-avatar" src={ item.img } alt="avatar" />
                                    <div className="info">
                                        <div className="username">{ item.name }</div>
                                        <div>{ item.bio ? item.bio : "" }</div>
                                    </div>
                                </li>
                    })}
                </ul>
                </div> : <></>}
            </div>
        </div>
    );
}