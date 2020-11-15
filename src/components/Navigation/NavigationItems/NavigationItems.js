import React, { Fragment } from 'react'

import NavigationItem from './NavigationItem/NavigationItem';
import cls from './NavigationItems.module.css';

export default (props) => {

    let clsNavItems = [cls.NavigationItems]
    if (props.open) {
        clsNavItems.push(cls.OpenNavItems)
    }

    let authNavItems = null
    if (props.isAuthenticated) {
        authNavItems =
            <Fragment>
                <NavigationItem link='/private'>
                    <p>Owned</p>
                    <svg width="1.5em" height="1.5em" viewBox="-1 0 16 16" class="bi bi-lock-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z" />
                        <path fill-rule="evenodd" d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z" />
                    </svg>
                </NavigationItem>
                <NavigationItem link='/followed' exact>
                    <p>Followed</p>
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-bell-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                    </svg>
                </NavigationItem>
                <NavigationItem link='/create-ranking' exact blue>
                    <p>Create</p>
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-tools" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M0 1l1-1 3.081 2.2a1 1 0 0 1 .419.815v.07a1 1 0 0 0 .293.708L10.5 9.5l.914-.305a1 1 0 0 1 1.023.242l3.356 3.356a1 1 0 0 1 0 1.414l-1.586 1.586a1 1 0 0 1-1.414 0l-3.356-3.356a1 1 0 0 1-.242-1.023L9.5 10.5 3.793 4.793a1 1 0 0 0-.707-.293h-.071a1 1 0 0 1-.814-.419L0 1zm11.354 9.646a.5.5 0 0 0-.708.708l3 3a.5.5 0 0 0 .708-.708l-3-3z" />
                        <path fill-rule="evenodd" d="M15.898 2.223a3.003 3.003 0 0 1-3.679 3.674L5.878 12.15a3 3 0 1 1-2.027-2.027l6.252-6.341A3 3 0 0 1 13.778.1l-2.142 2.142L12 4l1.757.364 2.141-2.141zm-13.37 9.019L3.001 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
                    </svg>
                </NavigationItem>
            </Fragment>

    } else {
        authNavItems = (
            <Fragment>
                <NavigationItem link='#' clicked={props.toggleLogin}>
                    <p>Login</p>
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-box-arrow-in-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                </NavigationItem>
                <NavigationItem link='#' clicked={props.toggleRegister}>
                    <p>Register</p>
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-person-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                </NavigationItem>
            </Fragment>
        );
    }

    return (
        <ul className={clsNavItems.join(' ')}>
            <NavigationItem link='/rankings/hottest/days=7' exact>
                <p>Home</p>
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-house-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                    <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                </svg>
            </NavigationItem>
            <NavigationItem link='/rankings/hottest/days=3' exact>
                <p>Hottest</p>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="24px" height="24px" viewBox="0 0 910.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                        <path d="M3360 12790 c0 -5 -21 -145 -46 -312 -263 -1749 -693 -2985 -1437 -4138 -132 -204 -293 -431 -601 -850 -531 -718 -654 -907 -840 -1280 -226 -454 -346 -864 -412 -1410 -22 -180 -25 -646 -5 -820 110 -972 534 -1831 1312 -2660 512 -546 1321 -1127 1795 -1289 l91 -31 392 0 c215 0 391 3 391 6 0 3 -118 146 -263 317 -318 377 -424 512 -566 722 -361 532 -582 1003 -676 1440 -47 219 -56 398 -29 600 56 433 171 683 560 1210 77 105 223 303 325 440 309 418 464 648 666 990 300 507 562 1065 773 1645 29 80 57 149 61 154 9 10 190 -155 462 -424 752 -740 1092 -1299 1307 -2144 94 -371 114 -517 114 -826 -1 -471 -76 -951 -255 -1624 -177 -668 -401 -1300 -759 -2139 -82 -194 -150 -356 -150 -360 0 -4 116 -7 257 -7 l257 0 201 152 c858 651 1419 1222 1882 1918 531 798 828 1631 915 2565 19 203 16 736 -6 945 -117 1154 -533 2233 -1297 3371 -873 1300 -2145 2535 -3834 3722 l-180 127 -202 0 c-124 0 -203 -4 -203 -10z" />
                    </g>
                </svg>
            </NavigationItem>
            <NavigationItem link='/rankings/newest/days=7' exact>
                <p>Newest</p>
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-bar-chart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <rect width="4" height="5" x="1" y="10" rx="1" />
                    <rect width="4" height="9" x="6" y="6" rx="1" />
                    <rect width="4" height="14" x="11" y="1" rx="1" />
                </svg>
            </NavigationItem>
            { authNavItems}
        </ul >
    );
}