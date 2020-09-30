import React, { Fragment, Component } from 'react'
import cls from './Position.module.css';

class Position extends Component {
    state = {
        isOpen: false
    }

    togglePosition = () => {
        this.setState(prevState => {
            return {
                isOpen: !prevState.isOpen
            }
        })
    }

    render() {
        let positionDetails = null;
        if (this.state.isOpen) {
            positionDetails = <div className={cls.PositionDetails}>
                <div className={cls.Description}>
                    <p>{this.props.rp.description}</p>
                </div>
                <div className={cls.Image}>
                    <img src={this.props.rp.image}></img>
                </div>
            </div>
        }

        return (
            <Fragment>
                <li onClick={this.togglePosition}>{this.props.rp.title}</li>
                {positionDetails}
            </Fragment>
        );
    }

}

export default Position;