import React from 'react';
import classes from './Backdrop.module.css';

export default (props) => {
    let bdClasses = [classes.Backdrop]
    if (props.sideDrawer) {
        bdClasses.push(classes.SideDrawerHelper)
    }
    return (props.show ? <div className={bdClasses.join(' ')} onClick={props.clicked}></div> : null);
};