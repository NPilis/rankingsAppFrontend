import React from 'react';
import cls from './RankingComments.module.css'
import Comment from './Comment/Comment';

export default (props) => {
    console.log(props.comments)
    props.comments.map(comment => {
        console.log(comment)
    })
    let comments = (
        <ul>
            {props.comments.map(comment => {
                return <Comment com={comment}/>
            })}
        </ul>
    )

    return (
        <div className={cls.RankingComments}>
            {comments}
        </div>
    );
}
