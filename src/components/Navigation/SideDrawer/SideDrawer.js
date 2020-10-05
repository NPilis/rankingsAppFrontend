import React, {Fragment} from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import cls from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [cls.SideDrawer, cls.Close];
    if (props.open) {
        attachedClasses = [cls.SideDrawer, cls.Open];
    }
    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed} sideDrawer/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <nav>
                    <NavigationItems
                        toggleLogin={props.toggleLogin}
                        toggleRegister={props.toggleRegister}
                        isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Fragment>
    );
};

export default sideDrawer;