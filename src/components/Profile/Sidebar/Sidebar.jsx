import React from 'react';
import './Sidebar.css';
import UserIdentity from '../../UserIdentity/UserIdentity';


export default function Sidebar () {
    return (
        <UserIdentity size={56} containerClass="user-identity__sidebar"/>
    );
};