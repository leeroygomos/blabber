import { useState, useRef, useEffect } from 'react';
import './UpdateProfileModal.css';

export default function UpdateProfileModal({ closeProfileModal, username, bio, email, refreshUserData, setUser }){
    const [ image, setImage ] = useState({ avatar: "" });
    const [ newUsername, setNewUsername ] = useState(username);
    const [ newEmail, setNewEmail] = useState(email);
    const [ newBio, setNewBio ] = useState(bio);
    const [ errMsg, setErrMsg] = useState(null);
    const ref = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatar: image.avatar, 
                                   username: newUsername, 
                                   email: newEmail, 
                                   bio: newBio }),
            credentials: "include",
        };
        fetch('/users/updateProfile', requestOptions) 
        .then(res => {
            if (res.status === 204){
                setUser({})
                refreshUserData().then(() => closeProfileModal());
                // closeProfileModal();
                
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            setErrMsg(data.message);
        })
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64);
        setImage({ ...image, avatar : base64 })
    }

    function convertToBase64(file){
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
            resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
            reject(error)
            }
        })
    }

    useEffect(() => {
        const handleOutsideClick = e => {
            if (ref.current && !ref.current.contains(e.target)) {
                 closeProfileModal();
            }
        }
        const timeoutId = setTimeout(() => {
            document.addEventListener("click", handleOutsideClick, false);
        }, 0);
        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("click", handleOutsideClick, false);
        };
    }, [closeProfileModal]);

    return (
        <div className='profile-modal' ref={ref}>
            <div className='profile-modal-content'>
                <div className="profile-modal-header">
                    <div className='profile-modal-title'>Update Profile</div>
                    <div className='close-btn' onClick={() => closeProfileModal()}>&times;</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='profile-modal-body'>
                        <label htmlFor="avatar-upload">Update Avatar</label>
                        <input type="file" 
                            name="avatar"
                            id="avatar-upload"
                            accept='.jpeg, .png, .jpg'
                            onChange={(e) => handleFileUpload(e)}
                        />
                        <label htmlFor="edit-username">Username</label>
                        <input type="text" 
                               name="username" 
                               id="edit-username" 
                               defaultValue={ username }
                               onChange={(e) => setNewUsername(e.target.value)}
                        />
                        <label htmlFor="edit-bio">Bio</label>
                        <input type="text" 
                               name="bio" 
                               id="edit-bio" 
                               defaultValue={ bio }
                               onChange={(e) => setNewBio(e.target.value)}
                        />
                        <label htmlFor="edit-email">Email</label>
                        <input type="email" 
                               name="email" 
                               id="edit-email" 
                               defaultValue={ email }
                               onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </div>
                    { errMsg ? <p className='error'>{ errMsg }</p> : <></>}
                    <div className='profile-modal-footer'>
                        <button className='save-btn'>Save</button>
                    </div>    
                </form>  
            </div>
        </div>
    )
}