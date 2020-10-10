import React from 'react';
import cls from './ProfileNav.module.css';

export default (props) => {
    let navClasses = [cls.NavBtn, cls.Active];
    
    return (
        <div className={cls.ProfileNav}>
            <div className={props.onStats ? navClasses.join(' ') : cls.NavBtn} onClick={props.showStats}><p>Stats</p></div>
            <div className={props.onStats ? cls.NavBtn : navClasses.join(' ')} onClick={props.showRankings}><p>Rankings</p></div>
        </div>
    )
}
