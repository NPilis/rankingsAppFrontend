import React, { Component } from 'react';
import cls from './Position.module.css';

class Position extends Component {

    state = {
        classes: [
            cls.Position
        ]
    }

    handleMouseOver = () => {
        this.setState({
            classes: [...this.state.classes, cls.MouseOver]
        })
    }

    handleMouseOut = () => {
        this.setState({
            classes: [cls.Position]
        })
    }

    render() {
        return (
            <div className={this.state.classes.join(' ')} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                <div className={cls.Inline}>
                    <div className={cls.Counter}>
                        <p>{this.props.pos+1}</p>
                    </div>
                    <div className={cls.PositionName}>
                        <p>{this.props.position.title}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Position;