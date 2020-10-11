import React, { Component, Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Modal from '../UI/Modal/Modal';
import * as modalActions from '../../store/actions/modal';
import Login from '../../containers/Auth/Login/Login';
import Register from '../../containers/Auth/Register/Register';
import CommentForm from '../RankingComments/CommentForm/CommentForm';
import { connect } from 'react-redux';
import modal from '../../store/reducers/modal';
import Share from '../Share/Share';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerToggle = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !this.state.showSideDrawer }
        });
    }

    sideDrawerClosed = () => {
        this.setState({ showSideDrawer: false });
    }

    render() {

        return (
            <Fragment>
                { this.props.showShareModal
                    ? <Modal
                        show={this.props.showShareModal}
                        toggle={this.props.toggleShareModal}>
                        <Share>
                        </Share>
                    </Modal>
                    : null}
                { this.props.showCommentForm
                    ? <Modal
                        show={this.props.showCommentForm}
                        toggle={this.props.toggleCommentForm}>
                        <CommentForm>
                        </CommentForm>
                    </Modal>
                    : null}
                { this.props.showLogin
                    ? <Modal
                        show={this.props.showLogin}
                        toggle={this.props.toggleLogin}>
                        <Login></Login>
                    </Modal>
                    : null}
                { this.props.showRegister
                    ? <Modal
                        show={this.props.showRegister}
                        toggle={this.props.toggleRegister}>
                        <Register></Register>
                    </Modal>
                    : null}
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    toggleClicked={this.sideDrawerToggle}
                    toggleLogin={this.props.toggleLogin}
                    toggleRegister={this.props.toggleRegister}
                    user={this.props.user} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosed}
                    toggleClicked={this.sideDrawerToggle}
                    toggleLogin={this.props.toggleLogin}
                    toggleRegister={this.props.toggleRegister}
                    isAuth={this.props.isAuthenticated} />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    showLogin: state.modal.showLogin,
    showRegister: state.modal.showRegister,
    showCommentForm: state.modal.showCommentForm,
    showShareModal: state.modal.showShareModal,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => {
    return {
        toggleRegister: () => dispatch(modalActions.toggleRegisterModal()),
        toggleLogin: () => dispatch(modalActions.toggleLoginModal()),
        toggleCommentForm: () => dispatch(modalActions.toggleCommentForm()),
        toggleShareModal: () => dispatch(modalActions.toggleShareModal())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Layout);