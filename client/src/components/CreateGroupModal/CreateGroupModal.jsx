import { useState, useRef, useEffect } from 'react';
import './CreateGroupModal.css';

export default function CreateGroupModal({ closeCreateGroupModal}) {
    const [groupName, setGroupName] = useState("");
    const [usernames, setUsernames] = useState([""]);
    const [errMsg, setErrMsg] = useState(null);

    const ref = useRef();

    const updateUsernames = (newValue, index) => {
        let newUsernames = [...usernames];
        newUsernames[index] = newValue;
        setUsernames(newUsernames);
    }

    const removeUsername = (index) => {
        let newUsernames = [...usernames];
        newUsernames.splice(index,1);
        setUsernames(newUsernames);
    }

    const addUsername = () => {
        setUsernames([...usernames, ""]);
    }

    // send add friend request
    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatName: groupName,  users: usernames}),
            credentials: "include",
        };
        fetch('/chats/createGroupChat', requestOptions) 
        .then(res => {
            if (res.status === 200){
                closeCreateGroupModal();
            }
            return res.json();
        })
        .then(data => {
            setErrMsg(data.message);
        })
    }

    // close modal by clicking outside
    // weird stuff
    // useEffect(() => {
    //     const handleOutsideClick = e => {
    //         if (ref.current && !ref.current.contains(e.target)) {
    //             closeCreateGroupModal();
    //         }
    //     }
    //     const timeoutId = setTimeout(() => {
    //         document.addEventListener("click", handleOutsideClick, false);
    //     }, 0);
    //     return () => {
    //         clearTimeout(timeoutId);
    //         document.removeEventListener("click", handleOutsideClick, false);
    //     };
    // }, [closeCreateGroupModal]);

    return (
        <div className='add-friend-modal' ref={ref}>
            <div className='add-friend-modal-content'>
                <div className="add-friend-modal-header">
                    <div className='add-friend-modal-title'>Create Group Chat</div>
                    <div className='close-btn' onClick={() => closeCreateGroupModal()}>&times;</div>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='add-friend-modal-body'>
                        <label htmlFor="group-name">Enter a Group Name</label>
                        <input type="text" name="group-name" id="group-name" placeholder="Enter a group name" onChange={(e) => setGroupName(e.target.value)}/>
                        <br/>
                        <label htmlFor="usernames">Group Members</label>
                        {usernames.map((value, index) => {
                            return (
                                <div key={index} className='username-list-body'>
                                    <input
                                        type="text"
                                        name='username'
                                        placeholder='Username'
                                        value={value}
                                        onChange={(e) => updateUsernames(e.target.value, index)}
                                    />
                                    <button name="remove-btn" className="remove-btn" onClick={() => removeUsername(index)}>x</button>
                                </div>
                                )
                            })
                        }
                        <button className="add-user-btn" onClick={() => addUsername()}>Add User</button>
                    </div>
                    { errMsg ? <p className='error'>{ errMsg }</p> : <></>}
                    <div className='add-friend-modal-footer'>
                        <button type="submit" className='save-btn'>Create Group</button>
                    </div>    
                </form>  
            </div>
        </div>
    )
}