import React from 'react'
import cls from './RankingInteractions.module.css';

export default (props) => {
    return (
        <div className={cls.RankingInteractions}>
            <p>Likes: {props.likes.length}..</p>
            <p>Dislikes: {props.dislikes.length}..</p>
            <p>Shares: {props.shares}..</p>
            <p>Comments: {props.comments}..</p>
        </div>
    );
}
