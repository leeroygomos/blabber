import { useState, useRef, useEffect } from 'react';
import './UpdateProfileModal.css';

export default function UpdateProfileModal({ closeProfileModal }){
    const [ image, setImage ] = useState({ avatar: "" });
    const ref = useRef();

    const handleSubmit = (e) => {
        // check if user has uploaded a new avatar
        if(!image.avatar) {
            closeProfileModal()
            return;
        }

        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(image),
            credentials: "include",
        };
        fetch('/users/uploadAvatar', requestOptions) 
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });

        closeProfileModal()
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
                               placeholder='This is not functional yet!'
                        />
                        <label htmlFor="edit-bio">Bio</label>
                        <input type="text" 
                               name="bio" 
                               id="edit-bio" 
                               placeholder='This is not functional yet!'
                        />
                    </div>
                    <div className='profile-modal-footer'>
                        <button className='save-btn'>Save</button>
                    </div>    
                </form>                
            </div>
        </div>
    )
}