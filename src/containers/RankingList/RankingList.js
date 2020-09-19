import React, { Component, Fragment } from 'react'
import Ranking from '../../components/Ranking/Ranking';
import { Link } from 'react-router-dom';
import cls from './RankingList.module.css';
import { connect } from 'react-redux';
import * as rankingActions from '../../store/actions/rankings';

class RankingList extends Component {
    componentDidMount() {
        this.props.fetchPublicRankings();
    }

    render() {
        let list = null;
        if(this.props.loading || this.props.fetching){
            list = <h1>Loading...</h1>
        } else {
            list = <ul>
                {this.props.publicRankings.map(ranking => (
                    <Ranking
                        onClick={() => this.props.fetchRanking(ranking.uuid)}
                        rank={ranking}
                        />
                ))
                }
            </ul>
        }
        return (
            <Fragment>
                <div className={cls.RankingList}>
                    {list}
                </div>
                <button onClick={this.props.fetchPublicRankings}>Fetch</button>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    publicRankings: state.rankings.publicRankings,
    isAuth: state.auth.isAuthenticated,
    loading: state.auth.isLoading,
    fetching: state.rankings.loading
});

const mapDispatchToProps = dispatch => {
    return {
        fetchRanking: (uuid) => dispatch(rankingActions.fetchRanking(uuid)),
        fetchPublicRankings: () => dispatch(rankingActions.fetchPublicRankings())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankingList);