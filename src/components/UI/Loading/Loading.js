import React from 'react';
import cls from './Loading.module.css';

export default (props) => {
    let classes = [];
    if (props.rankLoading) {
        classes.push(cls.RankLoading);
    } else {
        classes.push(cls.Loading);
    }

    return (
        <div className={classes.join(' ')} style={{animationDelay: `${props.delay}s`}}>
        </div>
    );
}
