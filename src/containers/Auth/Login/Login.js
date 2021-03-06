import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import cls from './Login.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import * as authActions from '../../../store/actions/auth';
import * as modalActions from '../../../store/actions/modal';
import * as rankingActions from '../../../store/actions/rankings';
import CloseBar from '../../../components/UI/Modal/CloseBar/CloseBar';
import { withRouter } from "react-router-dom";

class Login extends Component {

    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: '',
                    label: 'Email or username'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: '',
                    label: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity = () => true;

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state.controls.username.value, this.state.controls.password.value);
        this.props.history.push('/')
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(),
                touched: true
            }
        }
        this.setState({ controls: updatedControls });
    }

    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form = formElements.map(el => (
            <Fragment
                key={el.id}>
                <div>
                    <label>{el.config.elementConfig.label}</label>
                </div>
                <Input
                    elementType={el.config.elementType}
                    elementConfig={el.config.elementConfig}
                    value={el.config.value}
                    changed={(event) => (this.inputChangedHandler(event, el.id))}
                    shouldValidate={true}
                    touched={el.config.touched}
                    invalid={!el.config.valid}
                />
            </Fragment>
        ));
        return (
            <div className={cls.Login}>
                <CloseBar />
                <h1>Sing in</h1>
                <div className={cls.Wrapper}>
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <div className={cls.Inline}>
                            <p>You don't have an account? </p>
                            <Button redirectBtn={true} clicked={this.props.toggleRegister}>Sign up!</Button>
                        </div>
                        <Button authBtn={true} clicked={this.submitHandler}>Login</Button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (username, password) => dispatch(authActions.login(username, password)),
        toggleRegister: () => dispatch(modalActions.toggleRegisterModal()),
        onFetchRanks: () => dispatch(rankingActions.fetchPublicRankings())
    };
};

export default connect(null, mapDispatchToProps)(withRouter(Login));