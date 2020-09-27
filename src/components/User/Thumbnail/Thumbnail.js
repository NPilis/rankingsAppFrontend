import React from 'react';
import cls from './Thumbnail.module.css';

export default (props) => {
    let userImg = <img src="http://127.0.0.1:8000/media/user.png"></img>;
    let userClasses = [cls.BlankUserImg];
    if (props.userImg) {
        userImg = <img src={props.userImg}></img>
        userClasses.push(cls.UserImg)
    }
    if (props.smaller) {
        userClasses.push(cls.SmallerUserImg);
    }

    return (
        <div className={cls.Thumbnail}>
            <div className={userClasses.join(' ')}>
                {userImg}
            </div>
            <div className={cls.Username}>
                <p>{props.username}</p>
            </div>
        </div>
    );
}
