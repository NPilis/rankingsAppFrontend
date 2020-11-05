import React, { Component, Fragment } from 'react'
import Ranking from '../../components/Ranking/Ranking';
import cls from './RankingList.module.css';
import { connect } from 'react-redux';
import * as rankingActions from '../../store/actions/rankings';
import ListLoading from '../../components/UI/Loading/ListLoading';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../components/UI/Loading/Spinner';
import { Redirect } from 'react-router-dom';
import Center from '../../hoc/Center';

class RankingList extends Component {
    state = {
        shouldRedirect: false
    }

    componentDidMount() {
        if (this.props.match.params.type === "hottest" && this.props.match.params.days) {
            this.props.fetchPublicRankings(this.props.match.params.type, this.props.match.params.days);
        } else if (this.props.match.params.type === "newest") {
            this.props.fetchPublicRankings(this.props.match.params.type, this.props.match.params.days);
        } else {
            this.setState({ shouldRedirect: true })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAuth !== prevProps.isAuth || this.props.match.params.type !== prevProps.match.params.type) {
            this.props.fetchPublicRankings(this.props.match.params.type, this.props.match.params.days);
        }
    }

    render() {
        let list = null;
        if (this.props.loading) {
            list = <ListLoading />
        } else {
            list = <div className={cls.RankingGrid}>
                {this.props.publicRankings.map(ranking => (
                    <Ranking
                        rank={ranking} />))}
            </div>
        }
        return (
            this.state.shouldRedirect
                ? <Redirect to="/hottest/days=7" />
                : <Fragment>
                    <div className={cls.RankingList}>
                        <div className={cls.Wrapper}>
                            {list}
                        </div>
                        <div className={cls.InfScroll}>
                            <InfiniteScroll
                                dataLength={this.props.publicRankings.length}
                                next={this.props.fetchMorePublicRankings}
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
    publicRankings: state.rankings.publicRankings,
    hasMore: state.rankings.hasMore,
    isAuth: state.auth.isAuthenticated,
    loading: state.rankings.rankingLoading
});

const mapDispatchToProps = dispatch => {
    return {
        fetchPublicRankings: (type, days) => dispatch(rankingActions.fetchPublicRankings(type, days)),
        fetchMorePublicRankings: () => dispatch(rankingActions.fetchMorePublicRankings())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Center(RankingList));