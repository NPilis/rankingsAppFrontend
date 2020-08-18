import React from 'react'
import cls from './RankingContent.module.css';

export default (props) => {
    return (
        <div className={cls.RankingContent}>
            <p>{props.title}</p>
            <ul>
                <li>{props.ranking_positions[0].title}</li>
                <li>{props.ranking_positions[1].title}</li>
                <li>{props.ranking_positions[2].title}</li>
            </ul>
        </div>
    );
}
