import React from "react";
import './Input.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function Input(){
    return(
        <div className="input">
            <input type="text" placeholder='Message' className="textbox"></input>
            <div className="input-left">
                <span className="emoji">
                😊
                </span>
                <span className="send-btn"><FontAwesomeIcon icon={faPaperPlane} size="2xl" style={{color: "#ffffff",}} /></span>  
            </div>
        </div>
    );
}