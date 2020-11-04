import React from 'react';
import { NavLink } from 'react-router-dom';

import cls from './NavigationItem.module.css';


export default (props) => {
    let classes = [cls.NavigationItem];
    if (props.blue) {
        classes.push(cls.Blue)
    }
    return (
        <li className={classes.join(' ')} onClick={props.clicked}>
            <NavLink
                to={props.link}
                exact={props.exact}
                activeClassName={cls.active}
                component={props.component}>
                {props.children}
            </NavLink>
        </li>
    );
}
