import React, { Component, Fragment } from 'react'
import Ranking from '../../components/Ranking/Ranking';
import { Link } from 'react-router-dom';
import cls from './RankingList.module.css';
import { connect } from 'react-redux';
import * as rankingActions from '../../store/actions/rankings';
import Loading from '../../components/UI/Loading/Loading';

class RankingList extends Component {
    componentDidMount() {
        this.props.fetchPublicRankings();
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAuth !== prevProps.isAuth) {
          this.props.fetchPublicRankings();
        }
    }

    render() {
        let list = null;
        if(this.props.loading){
            list = (
                <ul>
                    <Loading rankLoading={true} delay={0}></Loading>
                    <Loading rankLoading={true} delay={0.2}></Loading>
                    <Loading rankLoading={true} delay={0.4}></Loading>
                    <Loading rankLoading={true} delay={0.6}></Loading>
                    <Loading rankLoading={true} delay={0}></Loading>
                    <Loading rankLoading={true} delay={0.2}></Loading>
                    <Loading rankLoading={true} delay={0.4}></Loading>
                    <Loading rankLoading={true} delay={0.6}></Loading>
                </ul>)
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
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    publicRankings: state.rankings.publicRankings,
    isAuth: state.auth.isAuthenticated,
    loading: state.rankings.loading
});

const mapDispatchToProps = dispatch => {
    return {
        fetchRanking: (uuid) => dispatch(rankingActions.fetchRanking(uuid)),
        fetchPublicRankings: () => dispatch(rankingActions.fetchPublicRankings())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankingList);