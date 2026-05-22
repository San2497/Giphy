import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <div className="header">
        <img src="/images/giphy-logo.png" alt="Giphy Logo" className="logo"/>
        <div className="menu">
            <h2>Reactions</h2>
            <h2>Entertainment</h2>
            <h2>Sports</h2>
            <h2>Artists</h2>
            <h2>MoreIcon</h2>
        </div>
    </div>
  );
} 