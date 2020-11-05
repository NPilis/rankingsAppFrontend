import React from 'react';
import Loading from './Loading';
import cls from './ListLoading.module.css';

export default (props) => {

    return (
        <div className={cls.GridLoading}>
            <Loading rankLoading={true} delay={0}></Loading>
            <Loading rankLoading={true} delay={0.2}></Loading>
            <Loading rankLoading={true} delay={0.2}></Loading>
            <Loading rankLoading={true} delay={0.3}></Loading>
            <Loading rankLoading={true} delay={0}></Loading>
            <Loading rankLoading={true} delay={0.1}></Loading>
            <Loading rankLoading={true} delay={0.2}></Loading>
            <Loading rankLoading={true} delay={0.3}></Loading>
        </div>
    )
}

