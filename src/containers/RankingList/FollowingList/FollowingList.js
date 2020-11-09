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
import Center from '../../../hoc/Center';
import ListLoading from '../../../components/UI/Loading/ListLoading';
import PageHeader from '../../../components/UI/Headers/PageHeader';

class FollowingList extends Component {
    componentDidMount() {
        this.props.fetchFollowingRankings();
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
            list = <ListLoading />
        } else {
            if (this.props.followingRankings.length > 0) {
                console.log("LIST")
                list = <div className={cls.RankingGrid}>
                    {this.props.followingRankings.map(ranking => (
                        <Ranking
                            rank={ranking}/>
                    ))}
                </div>
            } else {
                list = <div className={cls.NoRankings}>
                    <p>You don't have any followed users yet..</p>

                </div>
            }
        }
        return (
            <Fragment>
                <div className={cls.FollowingList}>
                    <PageHeader pageTitle={"Followed rankings"}></PageHeader>
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

export default connect(mapStateToProps, mapDispatchToProps)(Center(FollowingList));