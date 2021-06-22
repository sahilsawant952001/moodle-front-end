import React from 'react';
import { useLocation } from 'react-router-dom';
import classes from '../MaterialView/MaterialView.module.css';

function MaterialView() {

    const location = useLocation();

    const { filename,fileurl } = location.state;

    return (
        <div className={classes.MaterialView}>
            <h1>{filename.toUpperCase()}</h1>
            <iframe title='Material' src={fileurl} width="840" height="680"></iframe>
        </div>
    )
}

export default MaterialView
