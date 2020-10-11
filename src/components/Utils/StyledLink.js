import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cls from './StyledLink.module.css';

export default (props) => {

    return (
        <Link {...props} className={cls.StyledLink}>
        </Link>
    );
}