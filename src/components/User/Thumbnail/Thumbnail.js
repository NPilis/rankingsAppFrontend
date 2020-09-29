import React from 'react';
import cls from './Thumbnail.module.css';

export default (props) => {
    let userImg = <img src="http://127.0.0.1:8000/media/user.png"></img>;
    let userClasses = [cls.BlankUserImg];
    let thumbnailClasses = [cls.Thumbnail];
    if (props.userImg) {
        userImg = <img src={props.userImg}></img>
        userClasses.push(cls.UserImg)
    }
    if (props.smaller) {
        userClasses.push(cls.SmallerUserImg);
    }
    if (props.center) {
        thumbnailClasses.push(cls.Center)
    }

    return (
        <div className={thumbnailClasses.join(' ')}>
            <div className={userClasses.join(' ')}>
                {userImg}
            </div>
            <div className={cls.Username}>
                <p>{props.username}</p>
            </div>
        </div>
    );
}
