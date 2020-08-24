import React from 'react'
import cls from './RankingContent.module.css';
import { DragDropContext } from 'react-beautiful-dnd';

export default (props) => {
    const rp = <ol>
        {props.ranking_positions.map(rp => (
            <li key={rp.position}>{rp.title}</li>
        ))}
    </ol>
    let rankingContent = <div className={cls.RankingContent}>
        <p>{props.title}</p>
            {rp}
    </div>

    if (props.isLoaded) {
        rankingContent = <div className={cls.DetailRankingContent}>
            <p>{props.title}</p>
            <DragDropContext>
                {rp}
            </DragDropContext>
        </div>
    }

    return (
        <React.Fragment>
            {rankingContent}
        </React.Fragment>
    );
}
