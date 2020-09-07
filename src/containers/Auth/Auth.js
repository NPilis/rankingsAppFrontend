import React, { Component } from 'react';
import cls from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {

    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Login'
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
                    placeholder: 'Password'
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
            <div className={cls.Auth}>
                <form>
                    {form}
                    <Button click={this.submitHandler}>SUBMIT</Button>
                </form>
            </div>
        );
    }
}

export default Auth;