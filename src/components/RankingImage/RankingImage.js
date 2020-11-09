import React from 'react'
import cls from './RankingImage.module.css';
import Image from 'react-bootstrap/Image';

export default (props) => {
    let rankingImg = <img src="http://127.0.0.1:8000/media/blankImage.png"></img>;
    if (props.positionImg) {
        rankingImg = <img src="http://127.0.0.1:8000/media/blankImage.png"></img>;
    }
    let rankingClasses = [cls.BlankRankingImg];
    if (props.link) {
        rankingImg = <img src={props.link}></img>
        rankingClasses.push(cls.RankingImg)
    }
    if (props.bigger) {
        rankingClasses.push(cls.BiggerImg)
    }

    return (
        <div className={rankingClasses.join(' ')}>
            {rankingImg}
        </div>
    );
}
