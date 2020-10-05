import React, { Component } from 'react';
import cls from './CreateRanking.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as rankingActions from '../../store/actions/rankings';
import { connect } from 'react-redux';
import CreatePosition from './CreatePosition/CreatePosition';
import {arrayMove} from 'react-sortable-hoc';
import SortablePositions from '../../components/RankingPositions/SortablePositions';

class CreateRanking extends Component {
    state = {
        controls: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Title'
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
                    required: false,
                },
                valid: false,
                touched: false
            },
            status: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'private', displayVal: 'Private' },
                        { value: 'public', displayVal: 'Public' }
                    ]
                },
                value: 'public',
                validation: {
                    required: false,
                },
                valid: false,
                touched: false
            }
        },
        selectedImage: null,
        positions: []
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

    addPosition = (positionData) => {
        this.setState({
            ...this.state,
            positions: this.state.positions.concat(positionData)
        })
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            ...this.state,
            positions: arrayMove(this.state.positions, oldIndex, newIndex)
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let newRanking = new FormData();
        newRanking.append('title', this.state.controls.title.value);
        newRanking.append('content', this.state.controls.content.value);
        newRanking.append('status', this.state.controls.status.value);
        if (this.state.selectedImage) {
            newRanking.append('image', this.state.selectedImage, this.state.selectedImage.name);
        }
        this.props.createRanking(newRanking, this.state.positions);
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
            <div className={cls.CreateRanking}>
                <div className={cls.RankingForm}>
                    <h1>Create Ranking</h1>
                    <form>
                        {form}
                        <input type="file" accept="image/png, image/jpeg" onChange={this.imageSelectedHandler} />
                        <div className={cls.Inline}>
                        </div>
                        <Button authBtn={true} clicked={this.submitHandler}>Create</Button>
                    </form>
                </div>
                <div className={cls.Positions}>
                    <h2>Positions</h2>
                    <SortablePositions
                        positions={this.state.positions}
                        onSortEnd={this.onSortEnd}/>
                </div>
                <div className={cls.PositionForm}>
                    <CreatePosition
                            addPosition={this.addPosition}>
                    </CreatePosition>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createRanking: (newRanking, newPositions) => dispatch(rankingActions.createRanking(newRanking, newPositions))
    };
};

export default connect(null, mapDispatchToProps)(CreateRanking);