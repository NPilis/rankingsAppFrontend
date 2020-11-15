import React, { Component } from 'react';

import RankingContent from '../RankingContent/RankingContent';
import RankingInteractions from '../RankingInteractions/RankingInteractions';
import BlankInteractions from '../RankingInteractions/BlankInteractions';
import RankingMedia from '../RankingMedia/RankingMedia';
import { Link } from 'react-router-dom';
import Thumbnail from '../../components/User/Thumbnail/Thumbnail';

import cls from './Ranking.module.css'

class Ranking extends Component {
    render() {
        let status = null;
        let clsRanking = [cls.Ranking]
        if (this.props.withStatus) {
            status = <div className={cls.StatusBar}>
                {this.props.rank.status === "private"
                    ? <div className={cls.PrivateStatus}><p>Private</p></div>
                    : <div className={cls.PublicStatus}><p>Public</p></div>}
            </div>
        }

        return (
            <div className={cls.RankingContainer}>
                {status}
                <div className={clsRanking.join(' ')}>
                    <Link
                        to={`/rankings/${this.props.rank.uuid}/`}>
                        <div className={cls.FlexRow}>
                            <RankingContent
                                ranking={this.props.rank}
                                title={this.props.rank.title}
                                ranking_positions={this.props.rank.top_three_rp} />
                        </div>
                        <div className={cls.FlexCol}>
                            {this.props.rank.status == "public" ?
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
                                : <BlankInteractions></BlankInteractions>}
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Ranking;