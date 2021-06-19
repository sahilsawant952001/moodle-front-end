import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import classes from "../Course/Course.module.css";

function Course() {

    const param = useParams();

    const location = useLocation();

    const { courseName,courseID,teacherID } = location.state;

    const [materials, setmaterials] = useState([]);

    const [assignments, setassignments] = useState([]);

    const [quizes, setquizes] = useState([]);

    useEffect(() => {
        async function Call(){
            fetch('http://localhost:4000/GetMaterial',{
                method:'POST',
                body:JSON.stringify({
                    courseID:courseID,
                    teacherID:teacherID
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
                    courseID:courseID,
                    teacherID:teacherID
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

            fetch('http://localhost:4000/Student/GetQuizes',{
                method:'POST',
                body:JSON.stringify({
                    courseID:courseID,
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
            const url = '/Student/'+param.dept+'/'+param.teacher+'/Course/'+item.courseID+'/Material/'+item._id
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
            const url = '/Student/'+param.dept+'/'+param.teacher+'/Course/'+item.courseID+'/Assignment/'+item._id;
            return <Link to={{
                pathname:url,
                state:{
                    filename:item.name,
                    fileurl:item.fileUrl,
                    teacherID:item.teacherID,
                    lastsubmissionDate:item.submissionDate,
                    maxMarks:item.marks
                }
            }}><li className="list-group-item">{item.name}</li></Link>
        })
    }

    if(quizes.length!==0){
        data3 = quizes.map(item => {
            const url = '/Student/'+param.dept+'/'+param.teacher+'/Course/'+param.CourseID+'/Quiz';
            return <Link to={{
                pathname:url,
                state:{
                    quizInfo:item
                }
            }}><li className="list-group-item">{item.quizName}</li></Link>
        })
    }

    return (
        <div className={classes.Course}>
            <h1>Welcome TO {courseName}</h1>
            <h4>Study Material</h4>
             {materials.length===0 ? <p>{data1}</p> : <ul className="list-group" style={{width:"50%",margin:"5% auto"}}>
                {data1}
            </ul>}
            <h4>Assignments</h4>
            <ul className="list-group" style={{width:"50%",margin:"5% auto"}}>
                {data2}
            </ul>
            <h4>Quiz</h4>
            <ul className="list-group" style={{width:"50%",margin:"5% auto"}}>
                {data3}
            </ul>
        </div>
    )
}

export default Course
