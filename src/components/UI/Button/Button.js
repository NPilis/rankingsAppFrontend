import React from 'react'
import cls from './Button.module.css';

export default (props) => {
    let clsNames = [cls.Button];
    if (props.authBtn) clsNames.push(cls.AuthBtn)
    if (props.redirectBtn) clsNames.push(cls.RedirectBtn)
    if (props.editBtn) clsNames.push(cls.EditBtn)
    if (props.center) clsNames.push(cls.Center)

    return (
        <div className={clsNames.join(' ')} onClick={props.clicked}>
            {props.children}
        </div>
    );
}
