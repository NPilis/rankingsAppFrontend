import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import cls from './Spinner.module.css';

export default (props) => {
    
    return (
        <div className={cls.LoadingSpinner}>
            <h4>Loading...</h4>
        </div>
    );
}
