import React, { Fragment } from 'react'
import cls from './RankingPositions.module.css';
import Position from './Position/Position';

export default (props) => {
    let rankingPositions = null;
    let clsPositions = [cls.Positions]
    if (props.detail) {
        rankingPositions = <ol>
            {props.rankingPositions.map(rp => (
                <Position
                    key={rp.position}
                    rp={rp} />
            ))}
        </ol>
    }

    return (
        <Fragment>
            <div className={clsPositions.join(' ')}>
                {rankingPositions}
            </div>
        </Fragment>
    );

}