import React, { Component } from 'react'

class Position extends Component {

    state = {
        // For now
        style: {
            height: 30,
            width: 300,
            border: "3px solid red",
            borderStyle: 'hidden'
        }
    }

    handleMouseOver = () => {
        this.setState({style: {...this.state.style, borderStyle: "inset"}})
    }

    handleMouseOut = () => {
        this.setState({style: {...this.state.style, borderStyle: "hidden"}})
    }

    render() {
        return (
            <div>
                <div onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} style={this.state.style}>
                    <p>{this.props.position.title}</p>
                </div>
            </div>
        )
    }
}

export default Position;