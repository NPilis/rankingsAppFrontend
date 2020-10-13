import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as userActions from '../../../store/actions/users';
import cls from './UserDetail.module.css';
import ProfileHeader from '../../../components/User/Profile/ProfileHeader/ProfileHeader';
import ProfileImage from '../../../components/User/ProfileImage/ProfileImage';
import ProfileNav from '../../../components/User/Profile/ProfileNav/ProfileNav';
import ProfileStats from '../../../components/User/Profile/ProfileStats/ProfileStats';
import UserRankings from '../UserRankings/UserRankings';
import Button from '../../../components/UI/Button/Button';

class UserDetail extends Component {
    state = {
        onStats: true,
        shouldFetchRankings: true,
        isFollowed: false,
        num_of_followers: 0,
        num_of_following: 0,
        isSet: false
    }

    componentDidMount() {
        this.props.fetchSelectedUser(this.props.match.params.username)
        this.setState({...this.state, isSet: false})
    }

    toggleRankings = () => {
        this.setState({ ...this.state, onStats: false })
    }

    toggleStats = () => {
        this.setState({ ...this.state, onStats: true })
    }

    disableFetch = () => {
        this.setState({ ...this.state, shouldFetchRankings: false })
    }

    setNumbers = () => {
        if (this.props.user) {
            if(this.props.selectedUser.followers.includes(this.props.user.username)){
                this.setState({ isFollowed: true })
            } else {
                this.setState({ isFollowed: false })
            }
        }
        this.setState({
            num_of_followers: this.props.selectedUser.followers.length,
            num_of_following: this.props.selectedUser.following.length,
            isSet: true
        })
    }

    _onFollow = (e) => {
        console.log(this.state)
        e.stopPropagation();
        e.preventDefault();
        if (!this.props.user) {
            return null
        }
        this.setState(prevState => {
            let nF = prevState.num_of_followers;
            let iF = prevState.isFollowed
            return {
                isFollowed: !iF,
                num_of_followers: iF === false ? nF + 1 : nF - 1
            }
        })
        return this.props.followUser(this.props.selectedUser.username);
    }

    render() {
        let userDetail = null;
        if (!this.props.selectedUserLoading && this.props.selectedUser) {
            if(!this.state.isSet) {
                this.setNumbers()
            }
            userDetail = <div className={cls.User}>
                <div className={cls.ProfileHeader}>
                    <ProfileImage link={this.props.selectedUser.image}></ProfileImage>
                    <h1>{this.props.selectedUser.username}</h1>
                    <p>Joined {this.props.selectedUser.date_joined.slice(0, 10)}</p>
                    <Button followBtn clicked={this._onFollow}>
                        {this.state.isFollowed ? 'Unfollow' : 'Follow'}
                    </Button>
                </div>
                <ProfileNav
                    showStats={this.toggleStats}
                    showRankings={this.toggleRankings}
                    onStats={this.state.onStats}></ProfileNav>
                {this.state.onStats
                    ? <ProfileStats
                        nFollowers={this.state.num_of_followers}
                        nFollowing={this.state.num_of_following} />
                    : <UserRankings
                        userUUID={this.props.selectedUser.uuid}
                        shouldFetch={this.state.shouldFetchRankings}
                        disableFetch={this.disableFetch} />}
            </div>
        } else {
            userDetail = <p>Loading...</p>
        }
        if (this.props.user && this.props.selectedUser) {
            if (this.props.user.uuid === this.props.selectedUser.uuid) {
                this.props.clearSelectedUser()
                userDetail = <Redirect to='/profile'></Redirect>
            }
        }
        return (
            <div className={cls.UserDetail} >
                { userDetail}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages,
    user: state.auth.user,
    selectedUser: state.users.selectedUser,
    selectedUserLoading: state.users.selectedUserLoading
});

const mapDispatchToProps = dispatch => {
    return {
        clearSelectedUser: () => dispatch(userActions.clearSelectedUser()),
        fetchSelectedUser: (username) => dispatch(userActions.fetchSelectedUser(username)),
        followUser: (username) => dispatch(userActions.followUser(username))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);