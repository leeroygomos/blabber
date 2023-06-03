import './Profile.css';
import placeholder from '../../assets/pip.jpg';

export default function Profile(){
    return(
        <div class="profile">
            <div class="profile-left">
                <img src={placeholder} alt="avatar" class="avatar"/>
                {/* <span class="status"></span> */}
            </div>
            <div className="profile-right">
                <div class="username">leeroycool</div>
                <div>i like dinos.</div>
            </div>
        </div>
    );
}