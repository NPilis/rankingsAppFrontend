import React from 'react'

import heart from '../../assets/images/heart.png';
import cls from './RankingImage.module.css';

export default (props) => {
    return (
        <div className={cls.RankingImage} style={{width: props.height*1.5}}>
            <img src={heart} alt="rankImage" style={{height: props.height}}/>
        </div>
    );
}
