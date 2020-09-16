import React, { Component } from 'react';
import cls from './Comment.module.css';

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

    render() {
        return (
            <div className={cls.Comment}>
                <p>{this.props.com.user.username}</p>
                <p>{this.props.com.text}</p>
            </div>
        );
    }
}

export default Comment;