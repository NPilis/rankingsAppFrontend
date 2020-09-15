import React, {Component} from 'react';

import RankingContent from '../RankingContent/RankingContent';
import RankingInteractions from '../RankingInteractions/RankingInteractions';
import RankingMedia from '../RankingMedia/RankingMedia';
import axios from 'axios';
import {connect} from 'react-redux';

import cls from './Ranking.module.css'

class Ranking extends Component {

    likeRanking = (event) => {
        event.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
    
        if (this.props.token) {
            config.headers['Authorization'] = `Token ${this.props.token}`;
        }
    
        console.log(this.props.user)
        axios.post('/api/rankings/'+ this.props.rank.uuid + '/like/', null, config)
             .then(res => {
                 console.log(res);
             })
             .catch(err => {
                 console.log(err.response);
             })
    }

    render() {

        return (
            <div className={cls.Ranking} onClick={this.props.clicked}>
                <div className={cls.FlexRow}>
                    <RankingContent
                        title={this.props.rank.title}
                        ranking_positions={this.props.rank.top_three_rp} />
                    <RankingInteractions
                        user={this.props.user}
                        likes={this.props.rank.likes}
                        dislikes={this.props.rank.dislikes}
                        shares={this.props.rank.shares}
                        comments={this.props.rank.comments}
                        liked={this.likeRanking}
                    >
                        Likes, comments, shares
                </RankingInteractions>
                </div>
                <div className={cls.FlexCol}>
                    <RankingMedia
                        author={this.props.rank.author}
                        created_at={this.props.rank.created_at}>
                        Images, author, additional information
                </RankingMedia>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Ranking);