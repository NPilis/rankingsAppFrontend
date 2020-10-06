import React, { Component, Fragment } from 'react';
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, EmailIcon } from 'react-share';
import { connect } from 'react-redux';
import * as rankingActions from '../../store/actions/rankings';
import cls from './Share.module.css';
import Thumbnail from '../User/Thumbnail/Thumbnail';
import RankingImage from '../RankingImage/RankingImage';

class Share extends Component {

    render() {
        let rank = this.props.rankingData;
        let modalData = <Fragment>
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
                            link={rank.image}>
                        </RankingImage>
                    </div>
                </div>
                <div className={cls.Line}></div>
        </Fragment>

        return (
            <div className={cls.ShareForm}>
                <h3>Share ranking</h3>
                {modalData}
                <div className={cls.Buttons}>
                    <div className={cls.Btn}>
                        <FacebookShareButton
                            url={'https://github.com/'}>
                            <FacebookIcon
                                size={40}
                                round />
                        </FacebookShareButton>
                    </div>
                    <div className={cls.Btn}>
                        <TwitterShareButton
                            url={'https://github.com/'}>
                            <TwitterIcon
                                size={40}
                                round />
                        </TwitterShareButton>
                    </div>
                    <div className={cls.Btn}>
                        <EmailShareButton
                            url={'https://github.com/'}>
                            <EmailIcon
                                size={40}
                                round />
                        </EmailShareButton>
                    </div>
                </div>
            </div>
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
        shareRanking: (uuid, user) => dispatch(rankingActions.commentRanking(uuid, user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Share);
