import React from 'react';
import './Header.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Header() {
  return (
    <div className="header">
        <img src="/images/giphy-logo.webp" alt="Giphy Logo" className="logo"/>
        <div className="menu">
            <div className="button-wrapper reactions">
                <div className="menu-button hover-reactions">
                    <h2>Reactions</h2>
                </div>

            </div> 
            <div className="button-wrapper entertainment">
                <div className="menu-button hover-entertainment">
                    <h2>Entertainment</h2>
                </div>
            </div>
            <div className="button-wrapper sports">
                <div className="menu-button hover-sports">
                    <h2>Sports</h2>
                </div>
            </div>
            <div className="button-wrapper stickers">
                <div className="menu-button hover-stickers">
                    <h2>Stickers</h2>
                </div>
            </div>
            <div className="button-wrapper artists">
                <div className="menu-button hover-artists">
                    <h2>Artists</h2>
                </div>
            </div>
            <div className="button-wrapper more">
                <div className="menu-button hover-more">
                    <MoreVertIcon />
                </div>
            </div>
        </div>
        <div className="button">
            <h2>Upload</h2>

        </div>
        <div className="button">
            <h2>Create</h2> 
        </div>

        <div className="profile">
            <img src="/images/avatar.webp" alt="avatar"/>
            <h2>Profile</h2>
            <KeyboardArrowDownIcon />
        </div>
    </div>
  );
} 