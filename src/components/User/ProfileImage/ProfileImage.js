import React from 'react';
import cls from './ProfileImage.module.css';

export default (props) => {
    let profileImg = <img src="http://127.0.0.1:8000/media/user.png"></img>;
    let profileClasses = [cls.BlankProfileImg];
    if (props.link) {
        profileImg = <img src={props.link}></img>
        profileClasses.push(cls.ProfileImg)
    }

    return (
        <div className={profileClasses.join(' ')}>
            {profileImg}
        </div>
    );
}
