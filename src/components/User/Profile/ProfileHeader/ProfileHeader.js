import React from 'react';
import ProfileImage from '../../ProfileImage/ProfileImage';
import cls from './ProfileHeader.module.css';
import Button from '../../../UI/Button/Button';


export default (props) => {
    
    return (
        <div className={cls.ProfileHeader}>
            <ProfileImage link={props.image}></ProfileImage>
            <h1>{props.username}</h1>
            <p>Joined {props.joinDate.slice(0,10)}</p>
            <Button followBtn>Follow</Button>
        </div>
    )
}
