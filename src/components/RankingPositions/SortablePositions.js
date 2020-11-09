import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import SortablePosition from './Position/SortablePosition';
import cls from './SortablePositions.module.css';

const SortablePositions = SortableContainer((props) => {
    return (
        <div className={cls.SortablePositions}>
            {props.positions.map((position, index) => (
                <SortablePosition key={index} index={index} position={position} pos={index} deletePosHandler={props.deletePosHandler}/>
            ))}
        </div>
    );
})

export default SortablePositions;