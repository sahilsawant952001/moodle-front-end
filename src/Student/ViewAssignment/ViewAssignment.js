import React from 'react';
import { useLocation } from 'react-router-dom';
import classes from '../ViewAssignment/ViewAssignment.module.css';

function ViewSubmission() {
    const location = useLocation()

    const { fileUrl } = location.state;
    return (
        <div className={classes.ViewSubmission}>
            <embed src={fileUrl} width="800px" height="1000px" style={{margin:"5%"}}/>
        </div>
    )
}

export default ViewSubmission
