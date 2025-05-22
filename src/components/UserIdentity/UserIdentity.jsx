import React, {useContext, useState} from "react";
import "./UserIdentity.css";
import PropTypes from "prop-types";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

export default function UserIdentity({size = 40, containerClass = ""}) {
    const currentUser = useContext(CurrentUserContext);
    const [avatarError, setAvatarError] = useState(false);
    
    const userInitial = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "?";

    if (!currentUser || !currentUser.name) return null;

    return(
        <div className={`user-identity ${containerClass}`}>
            <p className="user-identity__name">{currentUser.name}</p>
                    
            {currentUser.avatar && !avatarError ? (
                <img
                    src={currentUser.avatar}
                    alt={userInitial}
                    className="user-identity__avatar"
                    onError={() => setAvatarError(true)}
                    style={{width: size, height: size}}
                />
            ) : (
                <div 
                    className="user-identity__initial"
                    style= {{width: size, height: size}}
                >
                    {userInitial}
                </div>
            )}
        </div>
    );
}

UserIdentity.propTypes = {
    size: PropTypes.number,
    containerClass: PropTypes.string,
};