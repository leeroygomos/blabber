import './Sidebar.css';
import Profile from '../Profile/Profile';
import Dropdown from '../Dropdown/Dropdown';

export default function Sidebar({ closeProfileModal, updateShowProfileModal, updateAddFriendModal, getCurrentChat, user, friends, groups }){

    // const [friends, setFriends] = useState([]);
    // const [groups, setGroups] = useState([]);

    // useEffect(() => {
    //    fetch('/chats/getFriends', {credentials : "include"}) 
    //    .then(res => res.json())
    //     .then(data => {
    //         setFriends(data.map((friend) => {
    //             return { chatId: friend._id, name: friend.username, img: friend.avatar, bio: friend.bio }
    //         }))
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    //     fetch('/chats/getGroups', {credentials : "include"}) 
    //    .then(res => res.json())
    //     .then(data => {
    //         setGroups(data.map((group) => {
    //             group.img = pfp;
    //             return { chatId: group._id, name: group.chatName, img: group.img }
    //         }))
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
        
    // }, [])

    return(
        <div className="sidebar">
            <Profile  updateShowProfileModal={ updateShowProfileModal } 
                      user={user}>
            </Profile>
            <Dropdown title={ 'Friends' } 
                      list={ friends }
                      openModal = { updateAddFriendModal }
                      getCurrentChat={ getCurrentChat }></Dropdown>
            <Dropdown title={ 'Groups' } list={ groups }></Dropdown>
        </div>
    );
    
}