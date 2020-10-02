import React from 'react';

import cls from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavbarToogle from '../SideDrawer/NavbarToogle/NavbarToogle';

export default (props) => (
    <header className={cls.Toolbar}>
        <NavbarToogle clicked={props.toggleClicked} />
        <div className={cls.Logo}>
            <Logo />
        </div>
        {/* <nav className={cls.DesktopOnly}>
            <NavigationItems
                toggleLogin={props.toggleLogin}
                toggleRegister={props.toggleRegister}
                isAuthenticated={props.isAuth} />
        </nav> */}
    </header>
);