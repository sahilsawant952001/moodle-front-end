import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classes from '../AllAttempts/AllAttempts.module.css';

function AllAttempts() {

    const param = useParams();

    const [attemptInfo, setattemptInfo] = useState([]);

    const [quizInfo, setquizInfo] = useState([]);

    let data = null;

    useEffect(() => {
        fetch('http://localhost:4000/Teacher/AllAttempts',{
            method:'POST',
            body:JSON.stringify({
                teacherID:param.teacher,
                courseID:param.courseID,
                deptID:param.dept,
                quizID:param.quizID
            }),
            headers:{
                'Content-Type':'application/json'
            }            
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(data.success){
               setquizInfo(data.quizInfo[0]);
               setattemptInfo(data.attemptInfo); 
            }else{
                console.log('NO DATA FOUND');
            }
        })
        .catch(err => {
            console.log('SOMETHING WENT WRONG');
        })
    },[])

    if(quizInfo!==null && attemptInfo.length!==0){
        data = attemptInfo.map( item => {
            const url = '/Teacher/'+param.dept+'/'+param.teacher+'/Course/'+param.courseID+'/Quiz/'+param.quizID+'/Attempt/'+item.studentID;
            return <Link to={{
                pathname:url,
                state:{
                    quizInfo:quizInfo,
                    attemptInfo:item
                }
            }}><li className="list-group-item">{item.studentID}</li></Link>
        })    
    }

    return (
        <div className={classes.AllAttempts}>
            <h1>Attempts</h1>
            <ul className="list-group" style={{width:"50%",margin:"5% auto"}}>
                {data}
            </ul>
        </div>
    )
}

export default AllAttempts
