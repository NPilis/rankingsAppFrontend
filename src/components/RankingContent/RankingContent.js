import React from 'react'
import cls from './RankingContent.module.css';
import RankingMedia from '../RankingMedia/RankingMedia';
import Thumbnail from '../User/Thumbnail/Thumbnail';

export default (props) => {

    const rp = <ol>
        {props.ranking_positions.map(rp => (
            <li key={rp.position}>{rp.title}</li>
        ))}
    </ol>
    let rankingContent = <div className={cls.RankingContent}>
        <div style={{display: "flex", justifyContent:"space-between", padding: "1px 0"}}>
            <Thumbnail
                username={props.ranking.author.username}
                userImg={props.ranking.author.image}
                smaller />
            <p style={{margin: "12px 4px 0 0", fontSize: "13px", color:"#AAB8C2"}}>Created at: {props.ranking.created_at.slice(0,10)}</p>
        </div>
        <div className={cls.RankingTitle}>
            <p>{props.title}</p>    
        </div>
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
