import React from 'react'
import cls from './RankingMedia.module.css';
import RankingImage from '../RankingImage/RankingImage';
import Thumbnail from '../User/Thumbnail/Thumbnail';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <div className={cls.RankingMedia}>
            <RankingImage 
                link={props.image}/>
        </div>
    );
}