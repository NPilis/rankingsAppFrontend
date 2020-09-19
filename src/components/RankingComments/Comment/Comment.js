import React, { Component } from 'react';
import cls from './Comment.module.css';
import Input from '../../UI/Input/Input';

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
                </form>
            </div>
        );
    }
}

export default Comment;