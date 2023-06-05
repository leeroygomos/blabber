import React from "react";
import './Sidebar.css';
import Profile from '../Profile/Profile';
import Dropdown from '../Dropdown/Dropdown';
import pfp1 from '../../assets/stickypasta.png';
import pfp2 from '../../assets/leeroycool.jpg';
import pfp3 from '../../assets/owl.jpg';

export default function Sidebar(){
    return(
        <div className="sidebar">
            <Profile></Profile>
            <Dropdown title={ 'Friends' } list={[{name: 'stickypasta', bio: "i like henry.", img: pfp1}, {name: 'leeroycool', bio: 'i like dinos.', img: pfp2}]}></Dropdown>
            <Dropdown title={ 'Groups' } list={[{name: "the homies", bio: "hohoho.", img: pfp3}]}></Dropdown>
        </div>
    );
}