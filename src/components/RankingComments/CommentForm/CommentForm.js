import React, { Component, Fragment } from 'react';
import cls from './CommentForm.module.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';
import * as rankingActions from '../../../store/actions/rankings';
import Thumbnail from '../../User/Thumbnail/Thumbnail';
import RankingImage from '../../RankingImage/RankingImage';

class CommentForm extends Component {

    state = {
        comment: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                placeholder: 'Type your comment...'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        }
    }

    inputChangedHandler = (event) => {
        const updatedComment = {
            ...this.state.comment,
            value: event.target.value,
            valid: true,
            touched: true
        }
        this.setState({ comment: updatedComment });
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.props.detail) {
            this.props.commentRanking(this.props.ranking.uuid, this.state.comment.value, this.props.user);
        } else {
            this.props.commentRanking(this.props.rankingData.uuid, this.state.comment.value, this.props.user);
        }
        this.setState({
            comment: {
                ...this.state.comment,
                value: ''
            }
        })
    }

    render() {
        let rank = this.props.rankingData;
        let modalData = null;
        if (this.props.detail) {
            rank = this.props.ranking
        } else {
            modalData = <Fragment>
                <div className={cls.Bar}>
                </div>
                <div className={cls.RankingData}>
                    <div className={cls.BlockWrapper}>
                        <div className={cls.InlineWrapper}>
                            <Thumbnail
                                username={rank.author.username}
                                userImg={rank.author.image} />
                            <div className={cls.DateCreated}>
                                <p>{rank.created_at.slice(0, 10)}</p>
                            </div>
                        </div>
                        <div className={cls.Title}>
                            <p>{rank.title}</p>
                        </div>
                    </div>
                    <div className={cls.RankingImage}>
                        <RankingImage
                            link={rank.rankingImg}>
                        </RankingImage>
                    </div>
                </div>
                <div className={cls.Line}></div>
            </Fragment>
        }
        let commentForm = null;
        if (this.props.user) {
            commentForm = <div className={cls.CommentForm}>
                <form onSubmit={this.submitHandler}>
                    <Thumbnail
                        username={this.props.user.username}
                        userImg={this.props.user.image} />
                    <Input
                        elementType={this.state.comment.elementType}
                        elementConfig={this.state.comment.elementConfig}
                        value={this.state.comment.value}
                        changed={(event) => (this.inputChangedHandler(event))}
                        shouldValidate={true}
                        touched={this.state.comment.touched}
                        invalid={this.state.comment.valid}
                    >
                    </Input>
                    <Button authBtn={true} clicked={this.submitHandler}>Comment</Button>
                </form>
            </div>
        }
        return (
            <Fragment>
                {modalData}
                {commentForm}
            </Fragment>
        );
        }
    }

    const mapStateToProps = state => ({
        error: state.errors,
        message: state.messages,
        user: state.auth.user,
        rankingData: state.modal.rankingData,
        ranking: state.rankings.ranking
    });

    const mapDispatchToProps = dispatch => {
        return {
            commentRanking: (uuid, comment, user) => dispatch(rankingActions.commentRanking(uuid, comment, user))
        };
    };

    export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);