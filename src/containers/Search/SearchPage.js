import React, { Component, Fragment } from 'react'
import Ranking from '../../components/Ranking/Ranking';
import cls from './SearchPage.module.css';
import { connect } from 'react-redux';
import * as rankingActions from '../../store/actions/rankings';
import * as userActions from '../../store/actions/users';
import ListLoading from '../../components/UI/Loading/ListLoading';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../components/UI/Loading/Spinner';
import { Redirect } from 'react-router-dom';
import SearchNav from '../../components/UI/SearchBar/SearchNav/SearchNav';
import Thumbnail from '../../components/User/Thumbnail/Thumbnail';
import Center from '../../hoc/Center';

class SearchPage extends Component {
    state = {
        onRankings: true,
        shouldRedirect: false
    }

    componentDidMount() {
        if(this.props.match.params.query) {
            this.props.searchRankings(this.props.match.params.query);
            this.props.searchUsers(this.props.match.params.query);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.query !== prevProps.match.params.query) {
            this.props.searchRankings(this.props.match.params.query);
            this.props.searchUsers(this.props.match.params.query);
        }
    }

    toggleRankings = (e) => {
        e.preventDefault();
        this.setState({onRankings: true})
    }

    toggleUsers = (e) => {
        e.preventDefault();
        this.setState({onRankings: false})
    }

    render() {
        let list = null;
        if (this.state.onRankings) {
            if (this.props.rankingLoading) {
                list = <ListLoading />
            } else {
                list = <div className={cls.RankingGrid}>
                    {this.props.foundRankings.map(ranking => (
                        <Ranking
                            key={ranking.uuid}
                            rank={ranking} />
                    ))}
                </div>
            }
        } else {
            if (this.props.userLoading) {
                list = <ListLoading />
            } else {
                list = <div className={cls.RankingGrid}>
                    {this.props.foundUsers.map(user => (
                        <Thumbnail
                            username={user ? user.username : null}
                            userImg={user ? user.image : null}/>
                    ))}
                </div>
            }
        }
        return (
            <Fragment>
                <div className={cls.RankingList}>
                    <div className={cls.Wrapper}>
                        <div className={cls.SearchHeader}>
                            <h3>Results for phrase: </h3>
                            <h4>"{this.props.match.params.query}"</h4>
                        </div>
                        <SearchNav
                            showRankings={this.toggleRankings}
                            showUsers={this.toggleUsers}
                            onRankings={this.state.onRankings}></SearchNav>
                        {list}
                    </div>
                    <div className={cls.InfScroll}>
                        {this.state.onRankings
                            ?   <InfiniteScroll
                                dataLength={this.props.foundRankings.length}
                                next={this.props.fetchMoreSearchedRankings}
                                hasMore={this.props.hasMoreRankings}
                                loader={<Spinner />}>
                            </InfiniteScroll>
                            :   <InfiniteScroll
                                dataLength={this.props.foundUsers.length}
                                next={this.props.fetchMoreSearchedUsers}
                                hasMore={this.props.hasMoreUsers}
                                loader={<Spinner />}>
                            </InfiniteScroll>}
                        
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    foundRankings: state.rankings.foundRankings,
    hasMoreRankings: state.rankings.hasMore,
    rankingLoading: state.rankings.rankingLoading,

    foundUsers: state.users.foundUsers,
    hasMoreUsers: state.users.hasMore,
    userLoading: state.users.userLoading,

    isAuth: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => {
    return {
        searchRankings: (query) => dispatch(rankingActions.searchRankings(query)),
        fetchMoreSearchedRankings: () => dispatch(rankingActions.fetchMoreSearchedRankings()),
        searchUsers: (query) => dispatch(userActions.searchUsers(query)),
        fetchMoreSearchedUsers: () => dispatch(userActions.fetchMoreSearchedUsers()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Center(SearchPage));