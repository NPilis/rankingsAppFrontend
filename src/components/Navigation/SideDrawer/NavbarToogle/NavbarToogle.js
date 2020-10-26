import React from 'react'
import cls from './NavbarToogle.module.css';

export default (props) => (
    <div className={cls.NavbarToogle} onClick={props.clicked}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img" focusable="false">
            <title>Menu</title>
            <path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M4 7h22M4 15h22M4 23h22"></path>
        </svg>
    </div>
);
