import React from "react";
import './Sidebar.css';
import Profile from '../Profile/Profile';
import Friends from '../Friends';
import Groups from '../Groups';

export default function Sidebar(){
    return(
        <div class="sidebar">
            <Profile></Profile>
            <Friends></Friends>
            <Groups></Groups>
        </div>
    );
}