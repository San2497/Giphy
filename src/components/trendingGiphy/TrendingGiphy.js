import React from "react";
import "./TrendingGiphy.css";

export default function TrendingGiphy({ giphy }) {

    return (
        <div className="trending-giphy" key={giphy.id}>
            <img src={giphy.images.downsized.url} alt={giphy.title} />
            <div className="giphy-hover-overlay">
                <div className="giphy-hover-info">
                    {giphy.user && giphy.user.avatar_url && (
                        <img
                            className="giphy-user-avatar"
                            src={giphy.user.avatar_url}
                            alt={giphy.user.display_name || 'user'}
                        />
                    )}
                    <div className="giphy-hover-text">
                        <p className="giphy-title">{giphy.title || 'Untitled'}</p>
                        {giphy.user && (
                            <p className="giphy-username">@{giphy.user.username}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
