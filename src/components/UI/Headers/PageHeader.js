import React from 'react';
import cls from './PageHeader.module.css';

export default (props) => {
    
    return (<div className={cls.PageHeader}>
        <h2>{props.pageTitle}</h2>
    </div>)
}
