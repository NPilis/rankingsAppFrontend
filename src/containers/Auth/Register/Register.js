import React, { Component } from 'react';
import { connect } from 'react-redux';
import cls from './Register.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions/auth';
import { returnErrors } from '../../../store/actions/messages';

class Register extends Component {

    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            password1: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            password2: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Repeat password'
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
        const newUser = {
            username: this.state.controls.username.value,
            email: this.state.controls.email.value,
            password: this.state.controls.password1.value
        }
        if (newUser.password !== this.state.controls.password2.value) {
            this.props.returnError({passwordNotMatch: 'Password do not match'}, 401)
        } else {
            this.props.onRegister(newUser);
        }
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
        this.setState({controls: updatedControls});
    }

    render () {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form = formElements.map(el => (
            <Input 
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                changed={(event) => (this.inputChangedHandler(event, el.id))}
                shouldValidate={true}
                touched={el.config.touched}
                invalid={!el.config.valid}
            />
        ));
        return (
            <div className={cls.Register}>
                <form>
                    {form}
                    <Button click={this.submitHandler}>SUBMIT</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (newUser) => dispatch(actions.register(newUser)),
        returnError: (msg, body, status) => dispatch(returnErrors(msg, body, status))
    };
};

export default connect(null, mapDispatchToProps)(Register);