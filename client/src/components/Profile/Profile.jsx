import './Profile.css';
import placeholder from '../../assets/pip.jpg';

export default function Profile({ updateShowProfileModal, userId, username, bio }){

    return(
        <div className="profile">
            <div>
                <img onClick={() => {updateShowProfileModal();}} src={placeholder} alt="avatar" className="avatar"/>
                {/* <span class="status"></span> */}
            </div>
            <div className='info'>
                <div className="username">{ username }</div>
                <div>{ bio }</div>
            </div>
        </div>
    );
}