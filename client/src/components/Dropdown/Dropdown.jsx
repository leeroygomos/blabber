import React, { useState } from "react";
import './Dropdown.css';

export default function Dropdown({title, list}){

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return(
        <div className="dropdown">
            <button className="toggle-btn" onClick={ toggleOpen }>
                { title }
            </button>
            {isOpen ? <div className="dropdown-list">
                <ul>
                    {list.map((item, index) => {
                        return <li key={index}>
                                    <div>{item.name}</div>
                                    <div>{item.bio}</div>
                                </li>
                    })}
                </ul>
            </div> : <></>}
        </div>
    );
}