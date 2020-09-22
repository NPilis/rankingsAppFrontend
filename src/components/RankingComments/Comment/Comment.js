import React, { Component, Fragment } from 'react';
import cls from './Comment.module.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';
import * as rankingActions from '../../../store/actions/rankings';
import Thumbnail from '../../User/Thumbnail/Thumbnail';

class Comment extends Component {

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
        this.props.commentRanking(this.props.rankingUUID, this.state.comment.value);
    }

    render() {
        return (
            <Fragment>
                <div className={cls.Bar}>
                </div>
                <div className={cls.RankingData}>
                    <div className={cls.BlockWrapper}>
                        <div className={cls.InlineWrapper}>
                            <Thumbnail
                                username={this.props.rankingData.author} />
                            <div className={cls.DateCreated}>
                                <p>{this.props.rankingData.createdAt}</p>
                            </div>
                        </div>
                        <div className={cls.Title}>
                            <p>The best netflix movies in 2020</p>
                        </div>
                    </div>
                    <div className={cls.RankingImage}>
                    </div>
                </div>
                <div className={cls.Line}></div>
                <div className={cls.CommentForm}>
                    <form onSubmit={this.submitHandler}>
                        <Thumbnail
                            username={'elo'} />
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
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages,
    user: state.auth.user,
    rankingData: state.modal.rankingData
});

const mapDispatchToProps = dispatch => {
    return {
        commentRanking: (uuid, comment) => dispatch(rankingActions.commentRanking(uuid, comment))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);