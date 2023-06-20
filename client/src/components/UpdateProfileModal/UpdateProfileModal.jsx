import React, { useState } from 'react';
import './UpdateProfileModal.css';

export default function UpdateProfileModal(){
    const [ image, setImage ] = useState({ avatar: "" });

    const handleSubmit = (e) => {
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

    return (
        <div className='profile-modal'>
            <div className='profile-modal-content'>
                <div className="profile-modal-header">
                    <div className='profile-modal-title'>Update Profile</div>
                    <button className='close-btn'>Close</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='profile-modal-body'>
                        <input type="file" 
                               name="avatar"
                               accept='.jpeg, .png, .jpg'
                               onChange={(e) => handleFileUpload(e)}
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