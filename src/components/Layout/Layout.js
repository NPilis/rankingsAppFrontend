import React, { Component, Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Modal from '../UI/Modal/Modal';
import * as modalActions from '../../store/actions/modal';
import Login from '../../containers/Auth/Login/Login';
import Register from '../../containers/Auth/Register/Register';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
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
        let login = null;
        let register = null;
        if (this.props.showLogin){
            login = (
                <Modal
                    show={this.props.showLogin}
                    toggle={this.props.toggleLogin}>
                    <Login></Login>
                </Modal>
            );
        }
        if (this.props.showRegister){
            register = (
                <Modal
                    show={this.props.showRegister}
                    toggle={this.props.toggleRegister}>
                    <Register></Register>
                </Modal>
            );
        }

        return (
            <Fragment>
                {login}
                {register}
                <Toolbar
                    toggleClicked={this.sideDrawerToggle}
                    toggleLogin={this.props.toggleLogin}
                    toggleRegister={this.props.toggleRegister} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosed} />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    showLogin: state.modal.showLogin,
    showRegister: state.modal.showRegister
});

const mapDispatchToProps = dispatch => {
    return {
        toggleRegister: () => dispatch(modalActions.toggleRegisterModal()),
        toggleLogin: () => dispatch(modalActions.toggleLoginModal())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Layout);