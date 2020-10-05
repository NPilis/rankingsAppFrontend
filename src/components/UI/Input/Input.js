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
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputCls.push(cls.TextArea)
            if (props.positionInput) {
                inputCls.push(cls.PosTextArea)
            }
            inputElement = <textarea
                className={inputCls.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputCls.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option value={option.value}>
                            {option.displayVal}
                        </option>
                    ))}
                </select>
            )
            break;
        default:
            inputElement = <input
                className={inputCls.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={cls.Input}>
            {/* <label className={cls.Label}>{props.elementConfig.placeholder}</label> */}
            {inputElement}
        </div>
    );
}
