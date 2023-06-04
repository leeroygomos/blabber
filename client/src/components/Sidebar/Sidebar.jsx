import React from "react";
import './Sidebar.css';
import Profile from '../Profile/Profile';
// import Friends from '../Friends';
// import Groups from '../Groups';
import Dropdown from '../Dropdown/Dropdown';

export default function Sidebar(){
    return(
        <div className="sidebar">
            <Profile></Profile>
            <Dropdown title={ 'Friends' } list={[{name: 'stickypasta', bio: "i like henry."}, {name: 'leeroycool', bio: 'i like dinos.'}]}></Dropdown>
            <Dropdown title={ 'Groups' } list={[{name: "the homies", bio: "hohoho."}]}></Dropdown>
        </div>
    );
}