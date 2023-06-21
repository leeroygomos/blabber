import { useNavigate } from 'react-router-dom';
import './ProfileOptions.css';

export default function ProfileOptions({ closeOptions, updateShowProfileModal }) {
    const navigate = useNavigate();

    const logout = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
        };
        fetch('/users/logout', requestOptions)
        .then(res => {
            if(res.status === 200) {
                navigate('/login');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className='profile-options'>
            <div className='option' onClick={() => {updateShowProfileModal(); closeOptions();}}>Edit Profile</div>
            <div className='option' onClick={() => logout()}>Logout</div>
        </div>
    )
}