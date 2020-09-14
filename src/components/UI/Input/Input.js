import React from 'react'
import cls from './Input.module.css';

export default (props) => {
    let inputElement = null;
    const inputCls = [cls.InputElement];

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputCls.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputCls.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        default:
            inputElement = <input
                className={inputCls.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
    }

    return (
        <div className={cls.Input}>
            <label className={cls.Label}>{props.elementConfig.placeholder}</label>
            {inputElement}
        </div>
    );
}
