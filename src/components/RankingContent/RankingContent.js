import React from 'react'
import cls from './RankingContent.module.css';

export default (props) => {
    const rp = <ol>
        {props.ranking_positions.map(rp => (
            <li key={rp.position}>{rp.title}</li>
        ))}
    </ol>
    return (
        <div className={cls.RankingContent}>
            <p>{props.title}</p>
            {rp}
        </div>
    );
}
