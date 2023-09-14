import {useState} from "react";
import './Input.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function Input({sendMessage}){
    const [inputValue, setInputValue] = useState("");

    const handleMessage = (event) => {
        event.preventDefault();
        sendMessage(inputValue);
        setInputValue("");
    }

    return(
        <form className="input" onSubmit={(event)=>handleMessage(event)}>
            <input type="text" placeholder='Message' className="textbox" value={inputValue} onChange={(event)=> setInputValue(event.target.value)}></input>
            <div className="input-left">
                <span className="emoji">
                😊
                </span>
                <FontAwesomeIcon className="send-btn" onClick={(event)=>handleMessage(event)} icon={faPaperPlane} size="2xl" style={{color: "#ffffff",}}/>
            </div>
        </form>
    );
}