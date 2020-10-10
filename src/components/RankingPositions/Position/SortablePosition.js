import React, { Component } from 'react'
import {SortableElement} from 'react-sortable-hoc';
import Position from './Position';

const SortablePosition = SortableElement((props) => {
    return (
        <Position position={props.position} pos={props.pos} deleted={props.deletePosHandler}/>
    )
})

export default SortablePosition;