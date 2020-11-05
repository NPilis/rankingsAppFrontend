import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as userActions from '../../../store/actions/users';
import cls from './CurrentProfile.module.css';
import ProfileImage from '../../../components/User/ProfileImage/ProfileImage';
import ProfileNav from '../../../components/User/Profile/ProfileNav/ProfileNav';
import ProfileStats from '../../../components/User/Profile/ProfileStats/ProfileStats';
import Button from '../../../components/UI/Button/Button';
import Center from '../../../hoc/Center';


class CurrentProfile extends Component {
    state = {
        num_of_followers: 0,
        num_of_following: 0,
        isSet: false,
        selectedImage: null,
        imagePreviewUrl: null,
        saveBtn: false
    }

    setNumbers = () => {
        this.setState({
            num_of_followers: this.props.user.followers.length,
            num_of_following: this.props.user.following.length,
            isSet: true,
            imagePreviewUrl: this.props.user.image
        })
    }

    imageSelectedHandler = event => {
        let reader = new FileReader();
        let img = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                ...this.state,
                saveBtn: true,
                selectedImage: img,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(img)
    }

    submitHandler = (event) => {
        event.preventDefault();
        let updatedProfile = new FormData();
        if (this.state.selectedImage) {
            updatedProfile.append('image', this.state.selectedImage, this.state.selectedImage.name);
        }
        this.props.editProfile(updatedProfile);
    }

    render() {
        let currentProfile = null;
        let saveBtn = <Button
            followBtn clicked={this.submitHandler}>
            Save
        </Button>
        if (!this.props.isLoading) {
            if(!this.state.isSet) {
                this.setNumbers()
            }
            currentProfile = <div className={cls.User}>
                <div className={cls.ProfileHeader}>
                    <ProfileImage link={this.state.imagePreviewUrl}></ProfileImage>
                    <input type="file" accept="image/png, image/jpeg" onChange={this.imageSelectedHandler} />
                    {this.state.saveBtn ? saveBtn : null}
                    <h1>{this.props.user.username}</h1>
                    <p>Joined {this.props.user.date_joined.slice(0, 10)}</p>
                </div>
                {/* <ProfileNav
                    showStats={this.toggleStats}
                    showRankings={this.toggleRankings}
                    onStats={this.state.onStats}></ProfileNav> */}
                <ProfileStats
                    nFollowers={this.state.num_of_followers}
                    nFollowing={this.state.num_of_following} />
            </div>
        } else {
            currentProfile = <p>Loading...</p>
        }
        return (
            <div className={cls.CurrentProfile} >
                { currentProfile }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages,
    user: state.auth.user,
    isLoading: state.auth.isLoading
});

const mapDispatchToProps = dispatch => {
    return {
        editProfile: (updatedProfile) => dispatch(userActions.editProfile(updatedProfile))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Center(CurrentProfile));