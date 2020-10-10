import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as userActions from '../../../store/actions/users';
import cls from './UserDetail.module.css';
import ProfileHeader from '../../../components/User/Profile/ProfileHeader/ProfileHeader';
import ProfileNav from '../../../components/User/Profile/ProfileNav/ProfileNav';
import ProfileStats from '../../../components/User/Profile/ProfileStats/ProfileStats';
import UserRankings from '../UserRankings/UserRankings';

class UserDetail extends Component {
    state = {
        onStats: true,
        shouldFetchRankings: true
    }

    componentDidMount() {
        this.props.fetchSelectedUser(this.props.match.params.username)
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

    render() {
        let userDetail = null;
        if (!this.props.selectedUserLoading && this.props.selectedUser) {
            userDetail = <div className={cls.User}>
                <ProfileHeader
                    image={this.props.selectedUser.image}
                    username={this.props.selectedUser.username}
                    joinDate={this.props.selectedUser.date_joined}></ProfileHeader>
                <ProfileNav
                    showStats={this.toggleStats}
                    showRankings={this.toggleRankings}
                    onStats={this.state.onStats}></ProfileNav>
                {this.state.onStats
                    ? <ProfileStats
                        user={this.props.selectedUser} />
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
                userDetail = <Redirect to='/'></Redirect>
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);