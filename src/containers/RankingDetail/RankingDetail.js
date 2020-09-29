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

class RankingDetail extends Component {
    state = {
        isLoaded: false
    }

    componentDidMount () {
        // console.log(this.props)
        // axios.get('/api/rankings/' + this.props.match.params.uuid)
        // .then(response => {
        //     this.setState({loadedRanking: response.data, isLoaded: true})
        //     console.log(response.data)
        // });
        console.log('xd')
        this.props.fetchRanking(this.props.match.params.uuid)
        this.setState({isLoaded: true})
    }

    render() {
        let ranking = <p>Loading ...</p>
        if ( !this.props.loading && this.state.isLoaded ){
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
                            <div className={cls.RankingImg}>
                                <RankingImage 
                                    link={this.props.ranking.image}
                                    bigger/>
                            </div>
                            <div className={cls.RankingAuthor}>
                                <Thumbnail
                                    username={this.props.ranking.author.username}
                                    userImg={this.props.ranking.author.image}
                                    center/>
                            </div>
                        </div>
                        <div className={cls.FloatRight}>
                            {/* <RankingInteractions 
                                ranking_uuid={this.props.ranking.uuid}
                                likes={this.props.rank.likes}
                                dislikes={this.props.rank.dislikes}
                                shares={this.props.rank.shares}
                                comments={this.props.rank.comments}
                                img={this.props.rank.image}
                                author={this.props.rank.author}
                                createdAt={this.props.rank.created_at}
                                title={this.props.rank.title}/> */}
                        </div>
                    </div>

                    <div className={cls.Description}>
                        <p>Description:</p>
                        <div className={cls.Content}>
                            {this.props.ranking.content}
                        </div>

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
    loading: state.rankings.loading
});

const mapDispatchToProps = dispatch => {
    return {
        fetchRanking: (uuid) => dispatch(rankingActions.fetchRanking(uuid)),
        likeRanking: (uuid) => dispatch(rankingActions.likeRanking(uuid)),
        dislikeRanking: (uuid) => dispatch(rankingActions.dislikeRanking(uuid)),
        shareRanking: (uuid) => dispatch(rankingActions.shareRanking(uuid)),
        commentRanking: (uuid, comment) => dispatch(rankingActions.commentRanking(uuid, comment))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankingDetail);