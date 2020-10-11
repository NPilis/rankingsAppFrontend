import React, { Component, Fragment } from 'react';
import Ranking from '../../../components/Ranking/Ranking';
import cls from './FollowingList.module.css';
import { connect } from 'react-redux';
import * as rankingActions from '../../../store/actions/rankings';
import Loading from '../../../components/UI/Loading/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../../components/UI/Loading/Spinner';
import SearchBar from '../../../components/UI/SearchBar/SearchBar';
import Button from '../../../components/UI/Button/Button';

class FollowingList extends Component {
    componentDidMount() {
        if (this.props.followingRankings.length < 1) {
            this.props.fetchFollowingRankings();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAuth !== prevProps.isAuth) {
            this.props.fetchFollowingRankings();
        }
    }

    createRedirect = () => {
        this.props.history.push('create-ranking/')
    }

    render() {
        let list = null;
        if (this.props.loading) {
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
            if (this.props.followingRankings.length > 0) {
                console.log("LIST")
                list = <ul>
                {this.props.followingRankings.map(ranking => (
                    <Ranking
                        rank={ranking}/>
                ))}
            </ul>
            } else {
                list = <div className={cls.NoRankings}>
                    <p>You don't have any rankings yet. Click button below to create!</p>
                    <div>
                        <Button redirectBtn center clicked={this.createRedirect}>Create</Button>
                    </div>
                </div>
            }
        }
        return (
            <Fragment>
                <div className={cls.PrivateList}>
                    <div className={cls.Wrapper}>
                        {list}
                    </div>
                    <div className={cls.InfScroll}>
                        <InfiniteScroll
                            dataLength={this.props.followingRankings.length}
                            next={this.props.fetchMoreFollowingRankings}
                            hasMore={this.props.hasMore}
                            loader={<Spinner />}>
                        </InfiniteScroll>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    followingRankings: state.rankings.followingRankings,
    hasMore: state.rankings.hasMore,
    isAuth: state.auth.isAuthenticated,
    loading: state.rankings.rankingLoading
});

const mapDispatchToProps = dispatch => {
    return {
        fetchFollowingRankings: () => dispatch(rankingActions.fetchFollowingRankings()),
        fetchMoreFollowingRankings: () => dispatch(rankingActions.fetchMoreFollowingRankings())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowingList);