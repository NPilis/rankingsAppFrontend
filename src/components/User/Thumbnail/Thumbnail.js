import React from 'react';
import cls from './Thumbnail.module.css';

export default (props) => {
    return (
        <div className={cls.Thumbnail}>
            <div className={cls.UserImg}>
            </div>
            <div className={cls.Username}>
                <p>{props.username}</p>
            </div>
        </div>
    );
}
