import React from 'react'
import cls from './Button.module.css';

export default (props) => {
    return (
        <span className={cls.Button}>
            {props.children}
        </span>
    );
}
