import React, { Component, Fragment } from 'react';
import Ranking from '../../../components/Ranking/Ranking';
import cls from './PrivateList.module.css';
import { connect } from 'react-redux';
import * as rankingActions from '../../../store/actions/rankings';
import Loading from '../../../components/UI/Loading/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../../components/UI/Loading/Spinner';
import SearchBar from '../../../components/UI/SearchBar/SearchBar';
import Button from '../../../components/UI/Button/Button';
import ListLoading from '../../../components/UI/Loading/ListLoading';
import Center from '../../../hoc/Center';
import PageHeader from '../../../components/UI/Headers/PageHeader';


class PrivateList extends Component {
    componentDidMount() {
        setTimeout(
            () => this.props.fetchPrivateRankings(),
            500
          );
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAuth !== prevProps.isAuth) {
            this.props.fetchPrivateRankings();
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
            if (this.props.privateRankings.length > 0) {
                console.log(this.props.privateRankings)
                list = <div className={cls.RankingGrid}>
                    {this.props.privateRankings.map(ranking => (
                        <Ranking
                            withStatus
                            rank={ranking}/>
                    ))}
                </div>
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
                    <PageHeader
                        pageTitle={"Owned rankings"}></PageHeader>
                    <div className={cls.Wrapper}>
                        {list}
                    </div>
                    <div className={cls.InfScroll}>
                        <InfiniteScroll
                            dataLength={this.props.privateRankings.length}
                            next={this.props.fetchMorePrivateRankings}
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
    privateRankings: state.rankings.privateRankings,
    hasMore: state.rankings.hasMore,
    isAuth: state.auth.isAuthenticated,
    loading: state.rankings.rankingLoading
});

const mapDispatchToProps = dispatch => {
    return {
        fetchPrivateRankings: () => dispatch(rankingActions.fetchPrivateRankings()),
        fetchMorePrivateRankings: () => dispatch(rankingActions.fetchMorePrivateRankings())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Center(PrivateList));