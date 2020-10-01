import React from 'react';
import cls from './Comment.module.css';

export default (props) => {
    let userImg = <img style={{border: '1px solid grey'}}src={'http://127.0.0.1:8000/media/user.png'}></img>
    if (props.comment.user.image) {
        userImg = <img src={props.comment.user.image}></img>;
    }
    let date = new Date(props.comment.created_at);
    let milis = Date.now()-date;
    let dDiff = Math.floor(milis/(24*60*60*1000));
    let hDiff = Math.floor(milis/(60*60*1000))-dDiff*24;
    let minDiff = Math.floor(milis/(60*1000))-dDiff*24*60-hDiff*60;

    return (
        <div className={cls.Comment}>
            <div className={cls.UserImg}>
                {userImg}
            </div>
            <div className={cls.FlexCol}>
                <div className={cls.FlexRow}>
                    <div className={cls.Username}>
                        <p>{props.comment.user.username} &#8226;</p>
                    </div>
                    <div className={cls.Timestamp}>
                        <p>{dDiff > 0 ? dDiff.toString() + 'd' : null} {hDiff > 0 ? hDiff.toString() + 'h' : null} {minDiff > 1 ? minDiff.toString() + 'm' : 'Just now...'}</p>
                    </div>
                </div>
                <div className={cls.Content}>
                    <p>{props.comment.text}</p>
                </div>
                <div className={cls.CommentInteractions}>
                    <p>reply</p>
                </div>
            </div>
        </div>
    );
}
