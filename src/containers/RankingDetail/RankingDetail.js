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
import Button from '../../components/UI/Button/Button';
import Center from '../../hoc/Center';

class RankingDetail extends Component {
    state = {
        isLoaded: false,
        afterEdit: false
    }

    componentDidMount() {
        this.props.fetchRanking(this.props.match.params.uuid)
        this.setState({ isLoaded: true })
    }

    componentDidUpdate(prevProps) {
        if(!this.state.afterEdit && prevProps.ranking != this.props.ranking){
            this.props.fetchRanking(this.props.match.params.uuid)
            this.setState({...this.state, afterEdit: true})
        }
    }

    editRedirect = () => {
        this.props.history.push('edit/')
    }

    render() {
        let editButton = null;
        let ranking = <p>Loading ...</p>
        if (!this.props.rankingLoading && this.state.isLoaded) {
            console.log(this.props)
            if (this.props.user) {
                if (this.props.ranking.author.email === this.props.user.email) {
                    editButton = <Button editBtn clicked={this.editRedirect}>
                        Update
                    </Button>
                }
            }
            ranking = (
                <div className={cls.RankingDetail}>
                    <div className={cls.RankingTitle}>
                        <p>{this.props.ranking.title}</p>
                    </div>
                    <div className={cls.Wrapper}>
                        <div className={cls.FloatLeft}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <div>
                                    <div className={cls.Date}>
                                        <p>{this.props.ranking.created_at.slice(0, 19).replace('T', ' at ')}</p>
                                    </div>
                                    <div className={cls.RankingAuthor}>
                                        <Thumbnail
                                            username={this.props.ranking.author.username}
                                            userImg={this.props.ranking.author.image} />
                                    </div>
                                </div>
                                <div className={cls.EditBtn}>
                                    {editButton}
                                </div>
                            </div>
                            <div className={cls.RankingImg}>
                                <RankingImage
                                    link={this.props.ranking.image}
                                    bigger />
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
                                    title={this.props.ranking.title} />
                            </div>
                        </div>
                    </div>
                    <div className={cls.Description}>
                        <p className={cls.Header}>Description</p>
                        <div className={cls.Content}>
                            {this.props.ranking.content}
                        </div>
                    </div>
                    
                    <div className={cls.RankingPositions}>
                        <p className={cls.Header}>Positions</p>
                        <RankingPositions
                            detail
                            rankingPositions={this.props.ranking.ranking_positions} />
                    </div>
                    <div className={cls.CommentSection}>
                        <p className={cls.Header}>Comments</p>
                        <CommentForm
                            detail />
                        <RankingComments
                            rankingUUID={this.props.ranking.uuid} />
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
    rankingLoading: state.rankings.rankingLoading,
    justEdited: state.rankings.justEdited
});

const mapDispatchToProps = dispatch => {
    return {
        fetchRanking: (uuid) => dispatch(rankingActions.fetchRanking(uuid)),
        likeRanking: (uuid) => dispatch(rankingActions.likeRanking(uuid)),
        dislikeRanking: (uuid) => dispatch(rankingActions.dislikeRanking(uuid)),
        shareRanking: (uuid) => dispatch(rankingActions.shareRanking(uuid))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Center(RankingDetail));