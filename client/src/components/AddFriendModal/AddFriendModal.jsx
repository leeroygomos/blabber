import { useState, useRef, useEffect } from 'react';
import './AddFriendModal.css';

export default function AddFriendModal({ closeAddFriendModal }) {
    const [username, setUsername] = useState("");
    const [errMsg, setErrMsg] = useState(null);

    const ref = useRef();

    // send add friend request
    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username }),
            credentials: "include",
        };
        fetch('/users/addFriend', requestOptions) 
        .then(res => {
            if (res.status === 200){
                closeAddFriendModal();
            }
            return res.json();
        })
        .then(data => {
            setErrMsg(data.message);
        })
    }

    // close modal by clicking outside
    useEffect(() => {
        const handleOutsideClick = e => {
            if (ref.current && !ref.current.contains(e.target)) {
                 closeAddFriendModal();
            }
        }
        const timeoutId = setTimeout(() => {
            document.addEventListener("click", handleOutsideClick, false);
        }, 0);
        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("click", handleOutsideClick, false);
        };
    }, [closeAddFriendModal]);

    return (
        <div className='add-friend-modal' ref={ref}>
            <div className='add-friend-modal-content'>
                <div className="add-friend-modal-header">
                    <div className='add-friend-modal-title'>Add Friend</div>
                    <div className='close-btn' onClick={() => closeAddFriendModal()}>&times;</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='add-friend-modal-body'>
                        <label htmlFor="friend-username">Enter a Username</label>
                        <input type="text" 
                               name="username" 
                               id="friend-username" 
                               placeholder="Enter your friend's username here"
                               onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    { errMsg ? <p className='error'>{ errMsg }</p> : <></>}
                    <div className='add-friend-modal-footer'>
                        <button className='save-btn'>Add Friend</button>
                    </div>    
                </form>  
            </div>
        </div>
    )
}