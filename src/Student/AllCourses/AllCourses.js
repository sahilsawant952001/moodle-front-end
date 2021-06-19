import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import classes from '../AllCourses/AllCourses.module.css';

function AllCourses() {

    const [allCourses, setallCourses] = useState([]);

    const param = useParams();

    const location = useLocation();

    const { teacherName,teacherSurname,teacherID } = location.state;

    const studentID = useSelector(state => state.auth.id);

    const history = useHistory();
  
    useEffect(() => {
        async function Call(){
            fetch('http://localhost:4000/AllCourses',{
                method:'POST',
                body:JSON.stringify({
                    teacherID:teacherID
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then( res => {
                return res.json();
            })
            .then( data => {
                if(data.success){
                    setallCourses(data.courses);
                }else{
                    alert(data.message);
                    history.goBack();
                }
            })
            .catch( err =>{
                alert('SOME ERROR OCCURED');
                history.goBack();
            })
        }
        Call();
    },[])

    let cdata = null;

    async function checkEnrollStatus(enrollkey,courseid,teacherid,urlToCourse,courseName){
        fetch('http://localhost:4000/Student/EnrollStatus',{
            method:'POST',
            body:JSON.stringify({
                studentID:studentID,
                teacherID:teacherid,
                deptID:param.dept,
                courseID:courseid
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then( data => {
            if(data.success){
                history.push({
                    pathname:urlToCourse,
                    state:{
                        courseName:courseName,
                        courseID:courseid,
                        teacherID:teacherID
                    }
                });
            }else{
                const x = window.prompt('YOU ARE NOT ENROLLED IN THIS COURSE ENTER ENROLLMENT KEY : ');
                if(x === enrollkey){
                    fetch('http://localhost:4000/Student/Enroll',{
                        method:'POST',
                        body:JSON.stringify({
                            courseID:courseid,
                            studentID:studentID,
                            teacherID:teacherid,
                            deptID:param.dept
                        }),
                        headers:{
                            'Content-Type':'application/json'
                        }
                    })
                    .then( res => {
                        return res.json();
                    })
                    .then( data => {
                        if(data.success){
                            alert('ENROLLMENT SUCCESSFULL');
                            history.push({
                                pathname:urlToCourse,
                                state:{
                                    courseName:courseName,
                                    courseID:courseid,
                                    teacherID:teacherID
                                }
                            });
                        }else{
                            alert('ENROLLMENT UNSUCCESSFULL');
                        }
                    })
                    .catch( err => {
                        alert('FAILED TO ENROLL');
                    })
                }else{
                    alert('WRONG ENROLLMENT KEY');
                }
            }
        })
        .catch( err => {
            alert('FAILED TO FETCH ENROLLMENT STATUS');
        })
    }

    if(allCourses.length!==0){
        cdata = allCourses.map( course => {
            const urlToCourse = '/Student/'+param.dept+'/'+param.teacher+'/Course/'+course._id;
            return <div onClick={() => checkEnrollStatus(course.enrollKey,course._id,course.teacherID,urlToCourse,course.courseName)}><li style={{padding:'5% 5%'}} className="list-group-item">{course.courseName}<button className='btn btn-secondary' style={{float:'right'}}>View</button></li></div>
        });
    }


    return (
        <div className={classes.AllCourses}>
            <h1>COURSES BY PROF. { teacherName.toUpperCase() + " " + teacherSurname.toUpperCase() }</h1>
            {cdata!==null ? <ul className="list-group" style={{width:"50%",margin:"1% auto"}}>
                {cdata}
            </ul>:<h2>No Courses Yet</h2>}
        </div>
    )
}

export default AllCourses
