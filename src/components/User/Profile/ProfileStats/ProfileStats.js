import React from 'react';
import cls from './ProfileStats.module.css';

export default (props) => {
    
    return (
        <div className={cls.ProfileStats}>
            <div className={cls.Stat}><p style={{fontWeight: "700", padding: "1px 4px"}}>Followers: {props.nFollowers}</p></div>
            <div className={cls.Stat}><p style={{fontWeight: "700", padding: "1px 4px"}}>Following: {props.nFollowing}</p></div>
            <div className={cls.Stat}><p style={{fontWeight: "700", padding: "1px 4px"}}>Rankings: {props.nRankings}</p></div>
            <div className={cls.Stat}><p style={{fontWeight: "700", padding: "1px 4px"}}>Comments: {props.nComments}</p></div>
        </div>
    );
}
