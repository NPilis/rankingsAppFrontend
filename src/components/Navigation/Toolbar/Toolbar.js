import React, { Fragment, useState } from 'react';
import cls from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavbarToogle from '../SideDrawer/NavbarToogle/NavbarToogle';
import ProfileImage from '../../User/ProfileImage/ProfileImage';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import { NavLink } from 'react-router-dom';

export default (props) => {

    const [showMenu, setMenu] = useState(false);

    let profileMenu = null;
    if (showMenu) {
        profileMenu = <div className={cls.ProfileMenu}>
            <div className={cls.Arrow}>
            </div>
            <ul onClick={() => setMenu(!showMenu)}>
                {props.isAuth
                    ? <Fragment>
                        <NavigationItem
                            link='/profile'>
                            <p>Profile</p>
                        </NavigationItem>
                        <NavigationItem
                            link='/settings'>
                            <p>Settings</p>
                        </NavigationItem>
                        <NavigationItem
                            link='/logout'>
                            <p>Logout</p>
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-box-arrow-in-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" fill-rule="evenodd"></path>
                                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"></path>
                            </svg>
                        </NavigationItem>
                    </Fragment>
                    : <Fragment>
                        <NavigationItem
                            link='#' clicked={props.toggleLogin}>
                            <p>Login</p>
                        </NavigationItem>
                        <NavigationItem
                            link='#' clicked={props.toggleRegister}>
                            <p>Register</p>
                        </NavigationItem>
                    </Fragment>}
            </ul>
        </div>

    }

    return (
        <header className={cls.Toolbar}>
            <NavbarToogle clicked={props.toggleClicked} />
            <div className={cls.Logo}>
                <Logo />
            </div>
            <div className={cls.UserAvatar}>
                <a href="javascript:void(0);" onClick={() => setMenu(!showMenu)}>
                    <ProfileImage
                        headerAvatar
                        isOpen={showMenu}
                        link={props.user ? props.user.image : null} />
                </a>
                {profileMenu}
            </div>
        </header>)
}