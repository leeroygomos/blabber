import './Profile.css';
import placeholder from '../../assets/pip.jpg';
import ProfileOptions from '../ProfileOptions/ProfileOptions';
import { useState, useEffect } from 'react';

export default function Profile({ updateShowProfileModal, userId, username, bio, avatar, currentUser }){

    const [showOptions, setShowOptions] = useState(false);
    const [user, setUser] = useState(currentUser);

    useEffect(() => {
        setUser(currentUser);
        console.log(currentUser.bio)
    }, [currentUser]);

    const closeOptions = () => {
        setShowOptions(false);
    }

    return(
        <div className="profile">
            <div className="avatar-container">
                <img onClick={() => setShowOptions(!showOptions)} src={user.avatar || placeholder} alt="avatar" className="avatar"/>
                {
                    showOptions ? 
                    <ProfileOptions closeOptions = { closeOptions }
                                    updateShowProfileModal={ updateShowProfileModal }/> : <></>
                }
            </div>
            <div className='info'>
                <div className="username">{ user.username }</div>
                <div>{ user.bio }</div>
            </div>
        </div>
    );
}