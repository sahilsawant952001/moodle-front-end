import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';

function Enrolled() {

    const param = useParams();

    const enrolled = [
        '2019140051',
        '2019140052',
        '2019140053',
        '2019140054',
        '2019140055',
        '2019140056',
        '2019140057',
        '2019140058',
        '2019140059',
        '2019140060',
    ]

    const data = enrolled.map( item => {
        const url = '/Teacher/'+param.dept+'/'+param.teacherID+'/Course/'+param.courseID+'/Enrolled/'+item;
        return <Link to={url}><li className="list-group-item">{item}</li></Link>
    } )

    return (
        <div>
            <ul className="list-group" style={{width:"50%",margin:"5% auto"}}>
                {data}
            </ul>
        </div>
    )
}

export default Enrolled
