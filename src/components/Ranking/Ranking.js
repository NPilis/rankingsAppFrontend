import React from 'react';
import Aux from '../../hoc/Auxiliary';

import RankingContent from '../RankingContent/RankingContent';
import RankingInteractions from '../RankingInteractions/RankingInteractions';
import RankingMedia from '../RankingMedia/RankingMedia';

import cls from './Ranking.module.css'

export default (props) => {
    
    return(
        <div className={cls.Ranking} onClick={props.clicked}>
            <div className={cls.FlexRow}>
                <RankingContent
                    title={props.rank.title}
                    ranking_positions={props.rank.top_three_rp}/>
                <RankingInteractions
                    likes={props.rank.likes}
                    dislikes={props.rank.dislikes}
                    // shares={props.rank.shares}
                    // comments={props.rank.comments}
                    >
                    Likes, comments, shares
                </RankingInteractions>
            </div>
            <div className={cls.FlexCol}>
                <RankingMedia
                    author={props.rank.author}
                    created_at={props.rank.created_at}>
                    Images, author, additional information
                </RankingMedia>
            </div>
        </div>
    );
}