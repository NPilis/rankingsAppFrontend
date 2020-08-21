import React from 'react';

import cls from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavbarToogle from '../SideDrawer/NavbarToogle/NavbarToogle';

export default (props) => (
    <header className={cls.Toolbar}>
        <NavbarToogle />
        <div className={cls.Logo}>
            <Logo />
        </div>
        <nav className={cls.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);