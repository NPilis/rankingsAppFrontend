import React, { Component, Fragment } from 'react'
import cls from './RankingInteractions.module.css';
import * as rankingActions from '../../store/actions/rankings';
import * as modalActions from '../../store/actions/modal';
import { connect } from 'react-redux';
import Login from '../../containers/Auth/Login/Login';
import Modal from '../UI/Modal/Modal';
import Comment from '../RankingComments/CommentForm/CommentForm';
import modal from '../../store/reducers/modal';

class RankingInteractions extends Component {
    state = {
        isLiked: false,
        isDisliked: false,
        showForm: false,
        // Probably not the best idea
        num_of_likes: this.props.likes.length,
        num_of_dislikes: this.props.dislikes.length,
        num_of_comments: this.props.comments ? this.props.comments.length : 0
    }

    componentDidMount() {
        if (this.props.user) {
            if (this.props.likes.includes(this.props.user.username)) {
                this.setState({ isLiked: true })
            } else if (this.props.dislikes.includes(this.props.user.username)) {
                this.setState({ isDisliked: true })
            }
        }
    }

    _onLike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.props.user) {
            this.props.toggleLogin();
            return null;
        }
        if (this.state.isDisliked) {
            this.setState(prevState => {
                return {
                    isDisliked: false,
                    isLiked: !prevState.isLiked,
                    num_of_likes: prevState.num_of_likes + 1,
                    num_of_dislikes: prevState.num_of_dislikes - 1
                }
            })
        } else if (this.state.isLiked) {
            this.setState(prevState => {
                return {
                    ...prevState,
                    isLiked: !prevState.isLiked,
                    num_of_likes: prevState.num_of_likes - 1
                }
            })
        } else {
            this.setState(prevState => {
                return {
                    ...prevState,
                    isLiked: !prevState.isLiked,
                    num_of_likes: prevState.num_of_likes + 1,
                }
            })
        }
        return this.props.likeRanking(this.props.ranking_uuid);
    }

    _onDislike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.props.user) {
            this.props.toggleLogin();
            return null;
        }
        if (this.state.isLiked) {
            this.setState(prevState => {
                return {
                    isLiked: false,
                    isDisliked: !prevState.isDisliked,
                    num_of_likes: prevState.num_of_likes - 1,
                    num_of_dislikes: prevState.num_of_dislikes + 1
                }
            })
        } else if (this.state.isDisliked) {
            this.setState(prevState => {
                return {
                    ...prevState,
                    isDisliked: !prevState.isDisliked,
                    num_of_dislikes: prevState.num_of_dislikes - 1
                }
            })
        } else {
            this.setState(prevState => {
                return {
                    ...prevState,
                    isDisliked: !prevState.isDisliked,
                    num_of_dislikes: prevState.num_of_dislikes + 1
                }
            })
        }
        return this.props.dislikeRanking(this.props.ranking_uuid);
    }

    _onComment = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.props.user) {
            this.props.toggleLogin();
            return null;
        }
        this.setState(prevState => {
            return {
                ...prevState,
                showForm: !prevState.showForm
            }
        })
        const rankingFormData = {
            uuid: this.props.ranking_uuid,
            author: this.props.author,
            image: this.props.img,
            title: this.props.title,
            created_at: this.props.createdAt
        }
        return this.props.toggleCommentForm(rankingFormData);
    }

    _onShare = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.props.user) {
            this.props.toggleLogin();
            return null;
        }
        this.setState(prevState => {
            return {
                ...prevState,
                showForm: !prevState.showForm
            }
        })
        const rankingFormData = {
            uuid: this.props.ranking_uuid,
            author: this.props.author,
            image: this.props.img,
            title: this.props.title,
            created_at: this.props.createdAt
        }
        return this.props.toggleShareModal(rankingFormData);
    }

    render() {
        let commentInteraction = null;
        let clsLike = [cls.Btn];
        let clsDislike = [cls.Btn];
        let classesInteractions = [cls.RankingInteractions];
        let classesInteraction = [cls.Interaction];
        if (this.state.isLiked) {
            clsLike.push(cls.Liked)
        } else if (this.state.isDisliked) {
            clsDislike.push(cls.Disliked)
        }
        if (this.props.detail) {
            classesInteraction.push(cls.DetailInteraction)
            classesInteractions.push(cls.DetailInteractions);
        } else {
            commentInteraction = 
                <div className={cls.Interaction}>
                    <div className={cls.Btn} onClick={this._onComment}>
                        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-chat-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                    </div>
                    <div className={cls.Counter}>
                        <p>{this.state.num_of_comments}</p>
                    </div>
                </div>
        }

        return (
            <Fragment>
                <div className={classesInteractions.join(' ')}>
                    <div className={classesInteraction.join(' ')}>
                        <div className={clsLike.join(' ')} onClick={this._onLike}>
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-hand-thumbs-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                            </svg>
                        </div>
                        <div className={cls.Counter}>
                            <p>{this.state.num_of_likes}</p>
                        </div>
                    </div>
                    <div className={classesInteraction.join(' ')}>
                        <div className={clsDislike.join(' ')} onClick={this._onDislike}>
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-hand-thumbs-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28v1c.563 0 .901.272 1.066.56.086.15.121.3.121.416 0 .12-.035.165-.04.17l-.354.353.353.354c.202.202.407.512.505.805.104.312.043.44-.005.488l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.415-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.353.352.373.714.267 1.021-.122.35-.396.593-.571.651-.653.218-1.447.224-2.11.164a8.907 8.907 0 0 1-1.094-.17l-.014-.004H9.62a.5.5 0 0 0-.595.643 8.34 8.34 0 0 1 .145 4.725c-.03.112-.128.215-.288.255l-.262.066c-.306.076-.642-.156-.667-.519-.075-1.081-.239-2.15-.482-2.85-.174-.502-.603-1.267-1.238-1.977C5.597 8.926 4.715 8.23 3.62 7.93 3.226 7.823 3 7.534 3 7.28V3.279c0-.26.22-.515.553-.55 1.293-.138 1.936-.53 2.491-.869l.04-.024c.27-.165.495-.296.776-.393.277-.096.63-.163 1.14-.163h3.5v-1H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z" />
                            </svg>
                        </div>
                        <div className={cls.Counter}>
                            <p>{this.state.num_of_dislikes}</p>
                        </div>
                    </div>
                    <div className={classesInteraction.join(' ')}>
                        <div className={cls.Btn} onClick={this._onShare}>
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-share" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M11.724 3.947l-7 3.5-.448-.894 7-3.5.448.894zm-.448 9l-7-3.5.448-.894 7 3.5-.448.894z" />
                                <path fill-rule="evenodd" d="M13.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-11-6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                            </svg>
                        </div>
                        <div className={cls.Counter}>
                            {/* <p>{this.props.shares.length}</p> */}
                            <p>0</p>
                        </div>
                    </div>
                    {commentInteraction}
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        likeRanking: (uuid) => dispatch(rankingActions.likeRanking(uuid)),
        dislikeRanking: (uuid) => dispatch(rankingActions.dislikeRanking(uuid)),
        shareRanking: (uuid) => dispatch(rankingActions.shareRanking(uuid)),
        toggleCommentForm: (rankingData) => dispatch(modalActions.toggleCommentForm(rankingData)),
        toggleShareModal: (rankingData) => dispatch(modalActions.toggleShareModal(rankingData)),
        toggleLogin: () => dispatch(modalActions.toggleLoginModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankingInteractions);