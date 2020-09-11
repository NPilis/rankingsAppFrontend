import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem';
import cls from './NavigationItems.module.css';

export default (props) => (
    <ul className={cls.NavigationItems}>
        <NavigationItem link='/rankings' exact>Public rankings</NavigationItem>
        <NavigationItem link='/' exact>Home page</NavigationItem>
        <NavigationItem link='/login'>Login</NavigationItem>
        <NavigationItem link='/register'>Register</NavigationItem>
    </ul>
);