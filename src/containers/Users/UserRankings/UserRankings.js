import React, { Component, Fragment } from 'react';
import Ranking from '../../../components/Ranking/Ranking';
import cls from './UserRankings.module.css';
import { connect } from 'react-redux';
import * as userActions from '../../../store/actions/users';
import Loading from '../../../components/UI/Loading/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../../components/UI/Loading/Spinner';
import SearchBar from '../../../components/UI/SearchBar/SearchBar';
import Button from '../../../components/UI/Button/Button';

class UserRankings extends Component {
    componentDidMount() {
        if (this.props.shouldFetch) {
            this.props.fetchUserRankings(this.props.userUUID);
            this.props.disableFetch();
        }
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
            if (this.props.selectedUserRankings.length > 0) {
                list = <ul>
                {this.props.selectedUserRankings.map(ranking => (
                    <Ranking
                        rank={ranking}/>
                ))}
            </ul>
            } else {
                list = <div className={cls.NoRankings}>
                    <p>This user has no public rankings yet!</p>
                </div>
            }
        }
        return (
            <Fragment>
                <div className={cls.PrivateList}>
                    <div className={cls.Wrapper}>
                        <SearchBar>
                        </SearchBar>
                        {list}
                    </div>
                    <div className={cls.InfScroll}>
                        <InfiniteScroll
                            dataLength={this.props.selectedUserRankings.length}
                            next={this.props.fetchMoreUserRankings}
                            hasMore={this.props.hasMoreRankings}
                            loader={<Spinner />}>
                        </InfiniteScroll>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    selectedUserRankings: state.users.selectedUserRankings,
    hasMoreRankings: state.users.hasMoreRankings,
    userRankingsLoading: state.users.userRankingsLoading,
    isAuth: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRankings: (userUUID) => dispatch(userActions.fetchUserRankings(userUUID)),
        fetchMoreUserRankings: () => dispatch(userActions.fetchMoreUserRankings())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRankings);