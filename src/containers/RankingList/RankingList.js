import React, { Component, Fragment } from 'react'
import Ranking from '../../components/Ranking/Ranking';
import { Link } from 'react-router-dom';
import cls from './RankingList.module.css';
import { connect } from 'react-redux';
import * as rankingActions from '../../store/actions/rankings';
import Loading from '../../components/UI/Loading/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../components/UI/Loading/Spinner';

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
                    <Loading rankLoading={true} delay={0.2}></Loading>
                    <Loading rankLoading={true} delay={0.3}></Loading>
                    <Loading rankLoading={true} delay={0}></Loading>
                    <Loading rankLoading={true} delay={0.1}></Loading>
                    <Loading rankLoading={true} delay={0.2}></Loading>
                    <Loading rankLoading={true} delay={0.3}></Loading>
                </ul>)
        } else {
            list = <ul>
                {this.props.publicRankings.map(ranking => (
                    <Ranking
                        rank={ranking}/>
                ))
                }
            </ul>
        }
        return (
            <Fragment>
                <div className={cls.RankingList}>
                    {list}
                    <div className={cls.InfScroll}>
                        <InfiniteScroll
                            dataLength={this.props.publicRankings.length}
                            next={this.props.fetchMorePublicRankings}
                            hasMore={this.props.hasMore}
                            loader={<Spinner/>}>
                        </InfiniteScroll>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    publicRankings: state.rankings.publicRankings,
    hasMore: state.rankings.hasMore,
    isAuth: state.auth.isAuthenticated,
    loading: state.rankings.rankingLoading
});

const mapDispatchToProps = dispatch => {
    return {
        fetchRanking: (uuid) => dispatch(rankingActions.fetchRanking(uuid)),
        fetchPublicRankings: () => dispatch(rankingActions.fetchPublicRankings()),
        fetchMorePublicRankings: () => dispatch(rankingActions.fetchMorePublicRankings())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankingList);