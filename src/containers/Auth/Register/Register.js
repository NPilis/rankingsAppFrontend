import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import cls from './Register.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import * as authActions from '../../../store/actions/auth';
import * as modalActions from '../../../store/actions/modal';
import { returnErrors } from '../../../store/actions/messages';
import CloseBar from '../../../components/UI/Modal/CloseBar/CloseBar';
import ProfileImage from '../../../components/User/ProfileImage/ProfileImage';

class Register extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: '',
                    label: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    maxLenght: 40,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '',
                    label: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                    maxLenght: 40,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            password1: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: '',
                    label: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    maxLenght: 40,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            password2: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: '',
                    label: 'Repeat password'
                },
                value: '',
                validation: {
                    required: true,
                    maxLenght: 40,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        selectedImage: null,
        imagePreviewUrl: null
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value !== '' && isValid
            }
            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid
            }
            if (rules.maxLength) {
                isValid = value.length <= rules.maxLength && isValid
            }
        }
        return isValid
    };

    checkFormValidity = () => {
        let isValid = true;
        for (let control in this.state.controls){
            isValid = this.state.controls[control].valid && isValid;
        }
        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.controls.password1.value !== this.state.controls.password2.value) {
            this.props.returnError({ passwordNotMatch: 'Password do not match' }, 401)
        } else {
            let formData = new FormData();
            formData.append('username', this.state.controls.username.value);
            formData.append('email', this.state.controls.email.value);
            formData.append('password', this.state.controls.password1.value);
            if (this.state.selectedImage) {
                formData.append('image', this.state.selectedImage, this.state.selectedImage.name);
            }
            this.props.onRegister(formData);
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls });
    }

    imageSelectedHandler = event => {
        let reader = new FileReader();
        let img = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                ...this.state,
                selectedImage: img,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(img)
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
                    valid={el.config.valid}
                />
            </Fragment>
        ));
        return (
            <div className={cls.Register}>
                <CloseBar/>
                <h1>Create account</h1>
                <div className={cls.Wrapper}>
                    <form>
                        {form}
                        <label>Profile picture<br /></label>
                        <input style={{ marginTop: "8px" }} type="file" accept="image/png, image/jpeg" onChange={this.imageSelectedHandler} />
                        <div style={{ margin: "10px 0" }}>
                            <ProfileImage
                                link={this.state.imagePreviewUrl} />
                        </div>

                        <div className={cls.Inline}>
                            <p>Already have an account? </p>
                            <Button redirectBtn={true} clicked={this.props.toggleLogin}>Sign in!</Button>
                        </div>
                        <div>
                            <Button authBtn={true} clicked={this.submitHandler}>Register</Button>
                        </div>
                    </form>
                </div>
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