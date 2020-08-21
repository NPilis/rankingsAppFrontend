import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem';
import cls from './NavigationItems.module.css';

export default (props) => (
    <ul className={cls.NavigationItems}>
        <NavigationItem link='/rankings/' exact>Test</NavigationItem>
        <NavigationItem link='/' exact>Public Rankings</NavigationItem>
    </ul>
);