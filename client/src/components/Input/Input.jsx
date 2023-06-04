import React from "react";
import './Input.css';

export default function Input(){
    return(
        <div className="input">
            <input type="text" placeholder='Message' className="textbox">

            </input>
            <div className="emoji">
                😊
            </div>
            <button className="send">
                Send
            </button>
            
        </div>
    );
}