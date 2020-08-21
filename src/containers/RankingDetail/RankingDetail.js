import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';

import RankingContent from '../../components/RankingContent/RankingContent';
import RankingInteractions from '../../components/RankingInteractions/RankingInteractions';
import RankingMedia from '../../components/RankingMedia/RankingMedia';
import axios from 'axios';
import cls from './RankingDetail.module.css'

class RankingDetail extends Component {
    state = {
        loadedRanking: null
    }

    componentDidMount () {
        axios.get('/api/rankings/' + this.props.match.params.uuid)
        .then(response => {
            this.setState({loadedRanking: response.data})
            console.log(response.data)
        });
    }

    render() {
        let ranking = <p>Loading ...</p>
        if ( this.state.loadedRanking ){
            ranking = (
                <div className={cls.RankingDetail}>
                    <div className={cls.FlexRow}>
                        <RankingContent
                            title={this.state.loadedRanking.title}
                            ranking_positions={this.state.loadedRanking.ranking_positions}/>
                        <RankingInteractions
                            likes={this.state.loadedRanking.likes}
                            dislikes={this.state.loadedRanking.dislikes}
                            // shares={this.state.loadedRanking.shares}
                            // comments={this.state.loadedRanking.comments}
                            >
                            Likes, comments, shares
                        </RankingInteractions>
                    </div>
                    <div className={cls.FlexCol}>
                        <RankingMedia
                            author={this.state.loadedRanking.author}
                            created_at={this.state.loadedRanking.created_at}>
                            Images, author, additional information
                        </RankingMedia>
                    </div>
                </div>
            );
        }
        return ranking;
    }
}

export default RankingDetail;