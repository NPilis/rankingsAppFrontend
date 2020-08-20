import React from 'react'
import cls from './RankingMedia.module.css';
import RankingImage from '../RankingImage/RankingImage';

export default (props) => {
    return (
        <div className={cls.RankingMedia}>
            <RankingImage height={80} />
            <a href="./">Author</a>
            <p>Created at</p>
            <p>{props.created_at.slice(0,10)}</p>
        </div>
    );
}