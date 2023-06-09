import './Profile.css';
import placeholder from '../../assets/pip.jpg';
import ProfileOptions from '../ProfileOptions/ProfileOptions';
import { useState } from 'react';

export default function Profile({ updateShowProfileModal, user }){

    const [showOptions, setShowOptions] = useState(false);

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