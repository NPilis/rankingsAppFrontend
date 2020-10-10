import React from 'react';
import cls from './ProfileStats.module.css';

export default (props) => {
    
    return (
        <div className={cls.ProfileStats}>
            <div className={cls.Stat}><p>Followers: {props.user.followers.length}</p></div>
            <div className={cls.Stat}><p>Following: {props.user.following.length}</p></div>
            <div className={cls.Stat}><p>Placeholder</p></div>
            <div className={cls.Stat}><p>Placeholder</p></div>
            <div className={cls.Stat}><p>Placeholder</p></div>
        </div>
    );
}
