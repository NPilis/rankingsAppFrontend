import React, {Component} from 'react';

import RankingContent from '../RankingContent/RankingContent';
import RankingInteractions from '../RankingInteractions/RankingInteractions';
import RankingMedia from '../RankingMedia/RankingMedia';

import cls from './Ranking.module.css'

class Ranking extends Component {
    render() {

        return (
            <div className={cls.Ranking} onClick={this.props.clicked}>
                <div className={cls.FlexRow}>
                    <RankingContent
                        ranking={this.props.rank}
                        title={this.props.rank.title}
                        ranking_positions={this.props.rank.top_three_rp}/>
                </div>
                <div className={cls.FlexCol}>
                    <RankingInteractions
                        ranking_uuid={this.props.rank.uuid}
                        likes={this.props.rank.likes}
                        dislikes={this.props.rank.dislikes}
                        shares={this.props.rank.shares}
                        comments={this.props.rank.comments}
                        img={this.props.rank.image}
                        author={this.props.rank.author}
                        createdAt={this.props.rank.created_at}
                        title={this.props.rank.title}>
                        Likes, comments, shares
                    </RankingInteractions>
                </div>
                {/* <div className={cls.FlexRow}>
                    <RankingContent
                        title={this.props.rank.title}
                        ranking_positions={this.props.rank.top_three_rp}/>
                    <RankingInteractions
                        ranking_uuid={this.props.rank.uuid}
                        likes={this.props.rank.likes}
                        dislikes={this.props.rank.dislikes}
                        shares={this.props.rank.shares}
                        comments={this.props.rank.comments}>
                        Likes, comments, shares
                    </RankingInteractions>
                </div>
                <div className={cls.FlexCol}>
                    <RankingMedia
                        author={this.props.rank.author.username}
                        createdAt={this.props.rank.created_at}>
                        Images, author, additional information
                    </RankingMedia>
                </div> */}

            </div>
        );
    }
}

export default Ranking;