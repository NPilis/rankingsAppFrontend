import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import SortablePosition from './Position/SortablePosition';

const SortablePositions = SortableContainer((props) => {
    return (
        <div>
            {props.positions.map((position, index) => (
                <SortablePosition key={position} index={index} position={position}/>
            ))}
        </div>
    );
})

export default SortablePositions;