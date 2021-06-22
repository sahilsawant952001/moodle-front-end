import React from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
function ViewAssignmentT() {

    const location = useLocation();

    return (
        <div>
            <h1>{location.state.filename}</h1>
            <iframe title='Assignment' src={location.state.fileUrl} width="840" height="680"></iframe>
        </div>
    )
}

export default ViewAssignmentT
