import React from 'react';
import { NavLink } from 'react-router-dom';

import cls from './NavigationItem.module.css';


export default (props) => (
    <li className={cls.NavigationItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={cls.active}>
            {props.children}
        </NavLink>
    </li>
);