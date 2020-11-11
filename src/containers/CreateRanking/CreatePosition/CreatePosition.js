import React, { Component } from 'react';
import cls from './CreatePosition.module.css';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import RankingImage from '../../../components/RankingImage/RankingImage';

class CreatePosition extends Component {
    state = {
        controls: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 70,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            content: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Description'
                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 250
                },
                valid: true,
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value.slice(0, this.state.controls[controlName].validation.maxLength),
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
        reader.readAsDataURL(img);
    }

    clearForm = () => {
        const initialControls =  {
            ...this.state.controls,
            name: {
                ...this.state.controls.name,
                value: ''
            },
            content: {
                ...this.state.controls.content,
                value: ''
            }
        }
        this.setState({controls: initialControls, selectedImage: null, imagePreviewUrl: null})
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (!this.checkFormValidity()) {
            this.props.returnError({posNameError: 'Name of position is required'}, 401)
        } else {
            let newPosition = {
                title: this.state.controls.name.value,
                description: this.state.controls.content.value
            }
            if (this.state.selectedImage) {
                newPosition.image = this.state.selectedImage
            }
            this.props.addPosition(newPosition);
            this.clearForm();
        }
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
            <Input
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                changed={(event) => (this.inputChangedHandler(event, el.id))}
                shouldValidate={true}
                touched={el.config.touched}
                valid={el.config.valid}
                positionInput
            />
        ));

        return (
            <div className={cls.CreatePosition}>
                <div className={cls.PositionForm}>
                    <form>
                        {form}
                        <input type="file" accept="image/png, image/jpeg" onChange={this.imageSelectedHandler} />
                    </form>
                </div>
                <div>
                    <div className={cls.SubmitBtn}>
                        <Button authBtn={true} clicked={this.submitHandler}>Add</Button>
                    </div>
                    <div>
                        <RankingImage
                            positionImg={true}
                            link={this.state.imagePreviewUrl} />
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePosition;