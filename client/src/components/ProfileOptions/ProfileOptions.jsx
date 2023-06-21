import './ProfileOptions.css';

export default function ProfileOptions({ closeOptions, updateShowProfileModal }) {
    return (
        <div className='profile-options'>
            <div className='option' onClick={() => {updateShowProfileModal(); closeOptions();}}>Edit Profile</div>
            <div className='option'>Logout</div>
        </div>
    )
}