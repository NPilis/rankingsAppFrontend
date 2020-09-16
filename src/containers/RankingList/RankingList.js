import React, { Component, Fragment } from 'react'
import Ranking from '../../components/Ranking/Ranking';
import { Link } from 'react-router-dom';
import cls from './RankingList.module.css';
import { connect } from 'react-redux';
import * as rankingActions from '../../store/actions/rankings';
import RankingComments from '../../components/RankingComments/RankingComments';

class RankingList extends Component {
    componentDidMount() {
        this.props.fetchPublicRankings();
    }

    render() {
        const list = <ul>
            {this.props.publicRankings.map(ranking => (
                <Link
                    to={'/rankings/' + ranking.uuid}
                    key={ranking.uuid}
                    onClick={() => this.props.fetchRanking(ranking.uuid)}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Ranking
                        rank={ranking} />
                </Link>
            ))}
        </ul>
        return (
            <Fragment>
                <div className={cls.RankingList}>
                    {list}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages,
    publicRankings: state.rankings.publicRankings,
    privateRankings: state.rankings.privateRankings,
    ranking: state.rankings.ranking
});

const mapDispatchToProps = dispatch => {
    return {
        fetchRanking: (uuid) => dispatch(rankingActions.fetchRanking(uuid)),
        fetchPublicRankings: () => dispatch(rankingActions.fetchPublicRankings())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankingList);