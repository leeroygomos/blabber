import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import './ProfileOptions.css';

export default function ProfileOptions({ closeOptions, updateShowProfileModal }) {
    const navigate = useNavigate();
    const ref = useRef();

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

    useEffect(() => {
        const handleOutsideClick = e => {
            if (ref.current && !ref.current.contains(e.target)) {
                 closeOptions();
            }
        }
        const timeoutId = setTimeout(() => {
            document.addEventListener("click", handleOutsideClick, false);
        }, 0);
        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("click", handleOutsideClick, false);
        };
    }, [closeOptions]);

    return (
        <div className='profile-options' ref={ref}>
            <div className='option' onClick={() => {updateShowProfileModal(); closeOptions();}}>Edit Profile</div>
            <div className='option' onClick={() => logout()}>Logout</div>
        </div>
    )
}