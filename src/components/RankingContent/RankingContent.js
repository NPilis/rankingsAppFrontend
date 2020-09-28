import React from 'react'
import cls from './RankingContent.module.css';
import RankingMedia from '../RankingMedia/RankingMedia';

export default (props) => {
    
    const rp = <ol>
        {props.ranking_positions.map(rp => (
            <li key={rp.position}>{rp.title}</li>
        ))}
    </ol>
    let rankingContent = <div className={cls.RankingContent}>
        <p className={cls.RankingTitle}>{props.title}</p>
        <div className={cls.Line}></div>
        <div className={cls.FlexRow}>
            {rp}
            <RankingMedia
                author={props.ranking.author.username}
                createdAt={props.ranking.created_at}
                image={props.ranking.image}
                authorImg={props.ranking.author.image}>
                Images, author, additional information
            </RankingMedia>
        </div>
    </div>

    if (props.isLoaded) {
        rankingContent = <div className={cls.DetailRankingContent}>
            <p>{props.title}</p>
                {rp}
        </div>
    }

    return (
        <React.Fragment>
            {rankingContent}
        </React.Fragment>
    );
}
