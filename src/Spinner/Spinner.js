import React from 'react';
import classes from "../Spinner/Spinner.module.css";

function Spinner() {
    return (
        <div className={classes.loader}>
            ..loading
        </div>
    )
}

export default Spinner
