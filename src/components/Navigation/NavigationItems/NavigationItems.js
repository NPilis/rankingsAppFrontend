import React, { Fragment } from 'react'

import NavigationItem from './NavigationItem/NavigationItem';
import cls from './NavigationItems.module.css';

export default (props) => {
    
    let authNavItems = null
    if (props.isAuthenticated) {
        authNavItems = <NavigationItem link='/logout'>Logout</NavigationItem>
    } else {
        authNavItems = (
            <Fragment>
                <NavigationItem
                    link='#'
                    clicked={props.toggleLogin}>Login</NavigationItem>
                <NavigationItem
                    link='#'
                    clicked={props.toggleRegister}>Register</NavigationItem>
            </Fragment>
        );
    }

    return (
        <ul className={cls.NavigationItems}>
            <NavigationItem link='/rankings' exact>Public rankings</NavigationItem>
            <NavigationItem link='/' exact>Home page</NavigationItem>
            {authNavItems}
        </ul>
    );
}