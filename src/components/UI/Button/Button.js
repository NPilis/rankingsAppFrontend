import React from 'react'
import cls from './Button.module.css';

export default (props) => {
    return (
        <div className={cls.Button} onClick={props.click}>
            {props.children}
        </div>
    );
}
