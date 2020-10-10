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
                        {/* <div className={cls.EditButton}>
                            <svg width="22px" height="22px" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </div> */}
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