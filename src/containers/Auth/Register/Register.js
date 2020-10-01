import React, { Component } from 'react';
import { connect } from 'react-redux';
import cls from './Register.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import * as authActions from '../../../store/actions/auth';
import * as modalActions from '../../../store/actions/modal';
import { returnErrors } from '../../../store/actions/messages';
import ImageUploader from 'react-images-upload';

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
        },
        selectedImage: null
    }

    checkValidity = () => true;

    submitHandler = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('username', this.state.controls.username.value);
        formData.append('email', this.state.controls.email.value);
        formData.append('password', this.state.controls.password1.value);
        if (this.state.selectedImage) {
            formData.append('image', this.state.selectedImage, this.state.selectedImage.name);
        }
        if (formData.get('password') !== this.state.controls.password2.value) {
            this.props.returnError({passwordNotMatch: 'Password do not match'}, 401)
        } else {
            this.props.onRegister(formData);
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

    imageSelectedHandler = event => {
        this.setState({
            ...this.state,
            selectedImage: event.target.files[0]
        });
        console.log(this.state)
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
                <h1>Sign up</h1>
                <form>
                    {form}
                    <input type="file" accept="image/png, image/jpeg" onChange={this.imageSelectedHandler}/>
                    <div className={cls.Inline}>
                        <p>Already have an account? </p>
                        <Button redirectBtn={true} clicked={this.props.toggleLogin}>Sign in!</Button>
                    </div>
                    <Button authBtn={true} clicked={this.submitHandler}>Register</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (newUser) => dispatch(authActions.register(newUser)),
        returnError: (msg, body, status) => dispatch(returnErrors(msg, body, status)),
        toggleLogin: () => dispatch(modalActions.toggleLoginModal())
    };
};

export default connect(null, mapDispatchToProps)(Register);