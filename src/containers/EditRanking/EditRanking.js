import React, { Component, Fragment } from 'react';
import cls from './EditRanking.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as rankingActions from '../../store/actions/rankings';
import { connect } from 'react-redux';
import CreatePosition from '../CreateRanking/CreatePosition/CreatePosition';
import { arrayMove } from 'react-sortable-hoc';
import SortablePositions from '../../components/RankingPositions/SortablePositions';
import RankingImage from '../../components/RankingImage/RankingImage';
import { Redirect } from 'react-router-dom';

class EditRanking extends Component {
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
        imagePreviewUrl: null,
        positions: [],
        oldListLen: 0,
        shouldRedirect: false,
        isAdded: false
    }

    componentDidMount() {
        const updatedTitle = {
            ...this.state.controls.title,
            value: this.props.ranking.title
        }
        const updatedContent = {
            ...this.state.controls.content,
            value: this.props.ranking.content
        }
        const updatedStatus = {
            ...this.state.controls.status,
            value: this.props.ranking.status
        }
        const updatedControls = {
            ...this.state.controls,
            title: updatedTitle,
            content: updatedContent,
            status: updatedStatus
        }
        console.log(this.props.ranking)
        this.setState({
            controls: updatedControls,
            selectedImage: null,
            imagePreviewUrl: this.props.ranking.image,
            positions: this.props.ranking.ranking_positions,
            oldListLen: this.props.ranking.ranking_positions.length
        })
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

    addPosition = (positionData) => {
        this.props.addPosition(positionData, this.props.ranking.uuid, this.state.positions.length + 1)
        this.setState({
            ...this.state,
            isAdded: false
        })
    }

    refreshPositions = () => {
        this.setState({
            ...this.state,
            positions: this.props.ranking.ranking_positions
        })
    }
    
    deletePosHandler = (event, posIndex) => {
        event.preventDefault();
        event.stopPropagation();
        let posID = this.state.positions[posIndex].id
        const updatedPositions = this.state.positions.filter((pos, idx) => {
            return idx !== posIndex
        })
        console.log(updatedPositions)
        this.setState({
            ...this.state,
            positions: updatedPositions
        })
        this.props.deletePosition(posID, this.props.ranking.uuid)
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
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
        this.props.editRanking(newRanking, this.props.ranking.uuid, this.state.positions, this.props.ranking.ranking_positions.length);
        this.setState({ ...this.state, shouldRedirect: true })
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

        if (!this.state.isAdded && this.props.posAdded !== null) {
            this.setState({
                ...this.state,
                isAdded: true,
                positions: this.state.positions.concat(this.props.posAdded)
            })
        }

        return (
            <Fragment>
                {this.state.shouldRedirect ? <Redirect to={`/rankings/${this.props.ranking.uuid}/`}></Redirect> : null}
                <div className={cls.EditRanking}>
                    <h2>Edit ranking</h2>
                    <div className={cls.Wrapper}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className={cls.RankingForm}>
                                <form>
                                    {form}
                                    <input type="file" accept="image/png, image/jpeg" onChange={this.imageSelectedHandler} />
                                    <div className={cls.Inline}>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <div className={cls.SubmitBtn}>
                                    <Button authBtn={true} clicked={this.submitHandler}>Save</Button>
                                    <Button authBtn={true} clicked={this.refreshPositions}>Refresh</Button>
                                </div>
                                <RankingImage
                                    link={this.state.imagePreviewUrl} />
                            </div>

                        </div>
                        <div style={{ display: "flex", justifyContent: "center", width: "100%", borderBottom: "2px solid lightgrey" }}>
                            <h3>Positions</h3>
                            <div className={cls.Tip}>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-question-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" />
                                </svg>
                                <span className={cls.TipText}><strong>Tip!</strong><br></br>You can add and delete positions, change the order with drag and drop option</span>
                            </div>
                        </div>
                        <div className={cls.Positions}>
                            <SortablePositions
                                positions={this.state.positions}
                                onSortEnd={this.onSortEnd}
                                deletePosHandler={this.deletePosHandler}
                                distance={2}
                                lockAxis="y" />
                        </div>
                        <div className={cls.PositionForm}>
                            <CreatePosition
                                addPosition={this.addPosition}>
                            </CreatePosition>
                        </div>
                    </div>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state => ({
    ranking: state.rankings.ranking,
    isLoading: state.rankings.rankingLoading,
    posAdded: state.rankings.posAdded
});

const mapDispatchToProps = dispatch => {
    return {
        fetchRanking: (rankingUUID) => dispatch(rankingActions.fetchRanking(rankingUUID)),
        editRanking: (newRanking, rankingUUID, newPositions, oldListLen) => dispatch(rankingActions.editRanking(newRanking, rankingUUID, newPositions, oldListLen)),
        addPosition: (newPosition, rankingUUID, place) => dispatch(rankingActions.addPosition(newPosition, rankingUUID, place)),
        deletePosition: (posID, rankingUUID) => dispatch(rankingActions.deletePosition(posID, rankingUUID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRanking);