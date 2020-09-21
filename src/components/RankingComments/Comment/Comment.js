import React, { Component } from 'react';
import cls from './Comment.module.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { connect } from  'react-redux';
import * as rankingActions from '../../../store/actions/rankings';

class Comment extends Component {

    state = {
        comment: {
            elementType: 'input',
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
            <div className={cls.Comment}>
                <form onSubmit={this.submitHandler}>
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
                    <Button authBtn={true} clicked={this.submitHandler}>Add comment</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages,
    user: state.auth.user,
    rankingUUID: state.modal.rankingUUID
});

const mapDispatchToProps = dispatch => {
    return {
        commentRanking: (uuid, comment) => dispatch(rankingActions.commentRanking(uuid, comment))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);