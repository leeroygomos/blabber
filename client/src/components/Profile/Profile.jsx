import './Profile.css';
import placeholder from '../../assets/pip.jpg';

export default function Profile(){
    return(
        <div className="profile">
            <div className="profile-left">
                <img src={placeholder} alt="avatar" className="avatar"/>
                {/* <span class="status"></span> */}
            </div>
            <div className="profile-right">
                <div className="username">pip</div>
                <div>i like dinos.</div>
            </div>
        </div>
    );
}