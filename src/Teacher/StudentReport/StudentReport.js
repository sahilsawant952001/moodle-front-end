import React from 'react'
import { useParams } from 'react-router'

function StudentReport() {

    const param = useParams();

    return (
        <div>
            <h1>Name : Sahil Sawant</h1>
            <h1>Uid : 2019140056</h1>
            <h1>Report Of {param.courseID}</h1>
        </div>
    )
}

export default StudentReport
