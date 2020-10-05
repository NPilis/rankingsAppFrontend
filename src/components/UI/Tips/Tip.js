import React from 'react';
import cls from './Tip.module.css';

export default (props) => {
    let tipClasses = [cls.Tip];
    switch(props.tipType) {
        case "note":
            tipClasses.push(cls.Note)
    }

    return (
        <div className={cls.Tip}>
            <text>{props.text}</text>
        </div>
    );
}
