import React from 'react'
import { useLocation } from 'react-router-dom';

function ViewAssignmentT() {
    const location = useLocation()

    const { fileUrl } = location.state;
    return (
        <div>
            <embed src={fileUrl} width="800px" height="1000px" style={{margin:"5%"}}/>
        </div>
    )
}

export default ViewAssignmentT
