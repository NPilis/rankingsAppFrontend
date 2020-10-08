import React from 'react';
import Loading from './Loading';

export default (props) => {

    return (
        <ul>
            <Loading rankLoading={true} delay={0}></Loading>
            <Loading rankLoading={true} delay={0.2}></Loading>
            <Loading rankLoading={true} delay={0.2}></Loading>
            <Loading rankLoading={true} delay={0.3}></Loading>
            <Loading rankLoading={true} delay={0}></Loading>
            <Loading rankLoading={true} delay={0.1}></Loading>
            <Loading rankLoading={true} delay={0.2}></Loading>
            <Loading rankLoading={true} delay={0.3}></Loading>
        </ul>
    )
}

