import React from 'react'
import cls from './RankingMedia.module.css';
import RankingImage from '../RankingImage/RankingImage';
import Thumbnail from '../User/Thumbnail/Thumbnail';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <div className={cls.RankingMedia}>
            <div className={cls.Img}>
                <RankingImage 
                    link={props.image}/>
            </div>
            <div className={cls.Info}>
                <Thumbnail
                    username={props.author}
                    userImg={props.authorImg}
                    smaller/>
                <p className={cls.Date}>{props.createdAt.slice(0,10)}</p>
            </div>
        </div>
    );
}