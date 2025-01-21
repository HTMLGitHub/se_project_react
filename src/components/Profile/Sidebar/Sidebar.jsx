import React from 'react';
import './Sidebar.css';
import avatar from '../../../assets/avatar.png';

export default function Sidebar () {
    return (
        <div className="sidebar">
            <img className="sidebar__user-avatar" src={avatar} alt="Terrence Tegegne"></img>
            <p className="sidebar__username">Terrence Tegegne</p>
        </div>
    );
};