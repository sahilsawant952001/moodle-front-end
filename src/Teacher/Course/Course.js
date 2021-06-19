import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import classes from '../Course/Course.module.css';

function Course() {
    const param = useParams();

    const material = [
        'Introduction',
        'SQL',
        'Transactions',
    ]

    const location = useLocation();

    const [materials, setmaterials] = useState([]);

    const [assignments, setassignments] = useState([]);

    const [quizes, setquizes] = useState([]);

    const { courseInfo } = location.state;

    useEffect(() => {
        async function Call(){
            fetch('http://localhost:4000/GetMaterial',{
                method:'POST',
                body:JSON.stringify({
                    courseID:param.courseID,
                    teacherID:param.teacher
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then( res => {
                return res.json()
            })
            .then( data => {
                if(data.success){
                    setmaterials(data.data);
                }else{
                    alert(data.message);
                }
            })
            .catch( err => {
                alert('FAILED TO LOAD MATERIALS');
            })

            fetch('http://localhost:4000/GetAssignments',{
                method:'POST',
                body:JSON.stringify({
                    courseID:param.courseID,
                    teacherID:param.teacher
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then( res => {
                return res.json()
            })
            .then( data => {
                if(data.success){
                    setassignments(data.data);
                }else{
                    alert(data.message);
                }
            })
            .catch( err => {
                alert('FAILED TO LOAD ASSIGNMENTS');
            })

            fetch('http://localhost:4000/Teacher/GetQuizes',{
                method:'POST',
                body:JSON.stringify({
                    courseID:param.courseID,
                    teacherID:param.teacher,
                    deptID:param.dept
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then( res => {
                return res.json()
            })
            .then( data => {
                if(data.success){
                    setquizes(data.data);
                }else{
                    alert(data.message);
                }
            })
            .catch( err => {
                alert('FAILED TO LOAD QUIZES');
            })
        }
        Call();
    },[])

    let data1 = 'No Material Added';
    let data2 = 'No Assignmets Added';
    let data3 = 'No Quiz Added';

    if(materials.length!==0){
        data1 = materials.map( item => {
            const url = '/Teacher/'+param.dept+'/'+param.teacher+'/Course/'+item.courseID+'/Material/'+item._id;
            return <Link to={{
                pathname:url,
                state:{
                    filename:item.name,
                    fileurl:item.url
                }
            }}><li className="list-group-item">{item.name}</li></Link>
        });
    }

    if(assignments.length!==0){
        data2 = assignments.map( item => {
            const url = '/Teacher/'+param.dept+'/'+param.teacher+'/Course/'+item.courseID+'/Assignments/'+item._id;
            return <Link to={{
                pathname:url,
                state:{
                    fileUrl:item.fileUrl,
                    name:item.name,
                    submissionDate:item.submissionDate,
                    maxMarks:item.marks
                }
            }}><li className="list-group-item">{item.name}</li></Link>
        })
    }

    if(quizes.length!==0){
        data3 = quizes.map( item => {
            const url = '/Teacher/'+param.dept+'/'+param.teacher+'/Course/'+param.courseID+'/Quiz/'+item.quizID;
            return <Link to={{
                pathname:url,
                state:{
                    quizInfo:item
                }
            }}><li className="list-group-item">{item.quizName}</li></Link>
        })
    }
    
    const url1 = '/Teacher/'+param.dept+'/'+param.teacher+'/Course/'+param.courseID+'/UploadMaterial';
    const url2 = '/Teacher/'+param.dept+'/'+param.teacher+'/Course/'+param.courseID+'/CreateAssignment';
    const url3 = '/Teacher/'+param.dept+'/'+param.teacher+'/Course/'+param.courseID+'/CreateQuiz';

    return (
        <div className={classes.Course}>
            <h1>{courseInfo.courseName}</h1>
            <h4>Study Material</h4>
            <ul className="list-group" style={{width:"50%",margin:"5% auto"}}>
                {data1}
                <Link to={url1} style={{margin:"2% 0"}} className='btn btn-dark'>Add Study Material</Link>
            </ul>
            <h4>Assignments</h4>
            <ul className="list-group" style={{width:"50%",margin:"5% auto"}}>
                {data2}
                <Link to={url2} style={{margin:"2% 0"}} className='btn btn-dark'>Create Assignment</Link>
            </ul>
            <h4>Quiz</h4>
            <ul className="list-group" style={{width:"50%",margin:"5% auto"}}>
                {data3}
                <Link to={url3} style={{margin:"2% 0"}} className='btn btn-dark'>Create Quiz</Link>
            </ul>
        </div>
    )
}

export default Course
