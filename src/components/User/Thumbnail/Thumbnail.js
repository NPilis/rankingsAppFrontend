import React, { Fragment } from 'react';
import cls from './Thumbnail.module.css';
import StyledLink from '../../Utils/StyledLink';

export default (props) => {
    let userImg = <img src="http://127.0.0.1:8000/media/user.png"></img>;
    let userClasses = [cls.BlankUserImg];
    let thumbnailClasses = [cls.Thumbnail];
    if (props.userImg) {
        userImg = <img src={props.userImg}></img>
        userClasses.push(cls.UserImg)
    }
    if (props.smaller) {
        userClasses.push(cls.SmallerUserImg);
        thumbnailClasses.push(cls.NoPadding);
    }
    if (props.center) {
        thumbnailClasses.push(cls.Center)
    }
    if (props.bigger) {
        thumbnailClasses.push(cls.Bigger)
    }

    let thumbnail = null;
    if (props.username !== null) {
        thumbnail = <div className={thumbnailClasses.join(' ')}>
            <StyledLink
                to={`/user/${props.username}`}>
                <div className={cls.Wrapper}>
                    <div className={userClasses.join(' ')}>
                        {userImg}
                    </div>
                    <div className={cls.Username}>
                        <p>{props.username}</p>
                    </div>
                </div>
            </StyledLink>
        </div>
    }

    return (
        <Fragment>
            {thumbnail}
        </Fragment>

    );
}
