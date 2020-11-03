import React from 'react';
import cls from './SearchNav.module.css';

export default (props) => {
    let navClasses = [cls.NavBtn, cls.Active];
    
    return (
        <div className={cls.SearchNav}>
            <div className={props.onRankings ? navClasses.join(' ') : cls.NavBtn} onClick={props.showRankings}><p>Rankings</p></div>
            <div className={props.onRankings ? cls.NavBtn : navClasses.join(' ')} onClick={props.showUsers}><p>Users</p></div>
        </div>
    )
}
