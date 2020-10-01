import React, { Component } from 'react';
import cls from './RankingComments.module.css'
import Comment from './Comment/Comment';
import * as rankingActions from '../../store/actions/rankings';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../UI/Loading/Spinner';

class RankingComments extends Component {
    state = {
        isLoaded: false
    }

    componentDidMount() {
        this.props.fetchComments(this.props.rankingUUID)
        this.setState({isLoaded: true})
    }

    render() {
        let comments = null;
        if (!this.props.commentsLoading && this.state.isLoaded && this.props.comments) {
            comments = (
                <ul>
                    {this.props.comments.map(comment => {
                        console.log(comment)
                        return <Comment
                            comment={comment} />
                    })}
                </ul>
            )
        }
        return (
            <div className={cls.RankingComments}>
                <InfiniteScroll
                    style={{overflow: 'none'}}
                    dataLength={this.props.comments.length}
                    hasMore={this.props.hasMoreComments}
                    next={this.props.fetchMoreComments}
                    loader={<Spinner />}>
                    {comments}
                </InfiniteScroll>

            </div>
        );
    }
}
const mapStateToProps = state => ({
    comments: state.rankings.comments,
    commentsLoading: state.rankings.commentsLoading,
    hasMoreComments: state.rankings.hasMoreComments
});

const mapDispatchToProps = dispatch => {
    return {
        fetchComments: (uuid) => dispatch(rankingActions.fetchRankingComments(uuid)),
        fetchMoreComments: () => dispatch(rankingActions.fetchMoreComments())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankingComments);
