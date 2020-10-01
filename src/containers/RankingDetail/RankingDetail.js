import React, { Component } from 'react';

import RankingContent from '../../components/RankingContent/RankingContent';
import RankingInteractions from '../../components/RankingInteractions/RankingInteractions';
import RankingMedia from '../../components/RankingMedia/RankingMedia';
import axios from 'axios';
import cls from './RankingDetail.module.css'
import * as rankingActions from '../../store/actions/rankings';
import { connect } from 'react-redux';
import RankingImage from '../../components/RankingImage/RankingImage';
import Thumbnail from '../../components/User/Thumbnail/Thumbnail';
import RankingPositions from './RankingPositions/RankingPositions';
import RankingComments from '../../components/RankingComments/RankingComments';
import CommentForm from '../../components/RankingComments/CommentForm/CommentForm';

class RankingDetail extends Component {
    state = {
        isLoaded: false
    }

    componentDidMount () {
        this.props.fetchRanking(this.props.match.params.uuid)
        this.setState({isLoaded: true})
    }

    render() {
        let ranking = <p>Loading ...</p>
        if ( !this.props.rankingLoading && this.state.isLoaded ){
            ranking = (
                <div className={cls.RankingDetail}>
                    <div className={cls.RankingTitle}>
                        <p>{this.props.ranking.title}</p>
                    </div>
                    <div className={cls.Wrapper}>
                        <div className={cls.FloatLeft}>
                            <div className={cls.Date}>
                                <p>{this.props.ranking.created_at.slice(0,19).replace('T', ' at ')}</p>
                            </div>
                            <div className={cls.RankingAuthor}>
                                <Thumbnail
                                    username={this.props.ranking.author.username}
                                    userImg={this.props.ranking.author.image}/>
                            </div>
                            <div className={cls.RankingImg}>
                                <RankingImage 
                                    link={this.props.ranking.image}
                                    bigger/>
                            </div>
                        </div>
                        <div className={cls.FloatRight}>
                            <div className={cls.RankingInteractions}>
                                <RankingInteractions
                                    detail
                                    ranking_uuid={this.props.ranking.uuid}
                                    likes={this.props.ranking.likes}
                                    dislikes={this.props.ranking.dislikes}
                                    shares={this.props.ranking.shares}
                                    comments={this.props.comments}
                                    img={this.props.ranking.image}
                                    author={this.props.ranking.author}
                                    createdAt={this.props.ranking.created_at}
                                    title={this.props.ranking.title}/>
                            </div>
                        </div>
                    </div>
                    <div className={cls.Description}>
                        <p>Description:</p>
                        <div className={cls.Content}>
                            {this.props.ranking.content}
                        </div>
                    </div>
                    <div className={cls.RankingPositions}>
                        <RankingPositions
                            detail
                            rankingPositions={this.props.ranking.ranking_positions}/>
                    </div>
                    <div className={cls.CommentSection}>
                        <CommentForm
                            detail/>
                        <RankingComments
                            rankingUUID={this.props.ranking.uuid}/>
                    </div>
                </div>
            );
        }
        return ranking;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages,
    user: state.auth.user,
    ranking: state.rankings.ranking,
    rankingLoading: state.rankings.rankingLoading
});

const mapDispatchToProps = dispatch => {
    return {
        fetchRanking: (uuid) => dispatch(rankingActions.fetchRanking(uuid)),
        likeRanking: (uuid) => dispatch(rankingActions.likeRanking(uuid)),
        dislikeRanking: (uuid) => dispatch(rankingActions.dislikeRanking(uuid)),
        shareRanking: (uuid) => dispatch(rankingActions.shareRanking(uuid))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankingDetail);