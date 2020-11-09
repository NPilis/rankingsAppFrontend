import React, { Component, Fragment } from 'react';
import cls from './Position.module.css';

class Position extends Component {

    state = {
        classes: [
            cls.Position
        ],
        showDetail: false
    }

    handleMouseOver = () => {
        this.setState({
            ...this.state,
            classes: [...this.state.classes, cls.MouseOver]
        })
    }

    handleMouseOut = () => {
        this.setState({
            ...this.state,
            classes: [cls.Position]
        })
    }

    handleMouseClick = () => {
        const prevBool = this.state.showDetail
        this.setState({
            ...this.state,
            showDetail: !prevBool
        })
    }

    render() {
        let positionDetails = null;
        if (this.state.showDetail) {
            positionDetails = <div className={cls.PositionDetails}>
            <div className={cls.Description}>
                <p>{this.props.position.description}</p>
            </div>
            <div className={cls.Image}>
                <img className={this.props.position.image ? cls.hasImg : null} src={this.props.position.image}></img>
            </div>
        </div>
        }
        return (
            <div className={this.state.classes.join(' ')} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={this.handleMouseClick}>
                <div className={cls.Inline}>
                    <div className={cls.Counter}>
                        <p>{this.props.pos + 1}</p>
                    </div>
                    <div className={cls.PositionName}>
                        <p>{this.props.position.title}</p>
                    </div>
                    <div className={cls.Buttons}>
                        <div className={cls.DeleteBtn} onClick={(e) => {this.props.deleted(e, this.props.pos)}}>
                            <svg width="22px" height="22px" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
                {positionDetails}
            </div>
        )
    }
}

export default Position;