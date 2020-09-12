import React, {Fragment} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import cls from './Modal.module.css';

export default (props) => {
    const switchStyle = {
        transform: props.show ? 'translateY(0)' : 'translayeY(100vh)',
        opacity: props.show ? '1': '0',
        zIndex: props.show ? '200' : '-100'
    };
    return (
        <Fragment>
            <Backdrop
                show={props.show}
                clicked={props.toggle} />
            <div className={cls.Modal} style={switchStyle}>
                {props.children}
            </div>
        </Fragment>
    )
}
