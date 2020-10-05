import React, { Component } from 'react';
import cls from './CreatePosition.module.css';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

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
                    required: true,
                },
                valid: false,
                touched: false
            }
        },
        selectedImage: null
    }

    checkValidity = () => true;

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

    imageSelectedHandler = event => {
        this.setState({
            ...this.state,
            selectedImage: event.target.files[0]
        });
        console.log(this.state)
    }

    submitHandler = (event) => {
        event.preventDefault();
        let newPosition = {
            title: this.state.controls.name.value,
            description: this.state.controls.content.value,
        }
        if (this.state.selectedImage) {
            newPosition.image = this.state.selectedImage
        }
        this.props.addPosition(newPosition);
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
                invalid={!el.config.valid}
            />
        ));

        return (
            <div className={cls.RankingForm}>
                <h1>Create Position</h1>
                <form>
                    {form}
                    <input type="file" accept="image/png, image/jpeg" onChange={this.imageSelectedHandler} />
                    <Button authBtn={true} clicked={this.submitHandler}>Add</Button>
                </form>
            </div>
        );
    }
}

export default CreatePosition;