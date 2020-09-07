import React from 'react'
import cls from './RankingMedia.module.css';
import RankingImage from '../RankingImage/RankingImage';

export default (props) => {
    return (
        <div className={cls.RankingMedia}>
            <div className={cls.Img}>
                <RankingImage />
            </div>
            <div className={cls.Info}>
                <p>Autor</p>
                <p>Created at</p>
                {/* <p>{props.created_at.slice(0,10)}</p> */}
            </div>
        </div>
    );
}