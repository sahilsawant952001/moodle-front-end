import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Spinner from '../../Spinner/Spinner';
import { authActions } from '../../Store/Auth';
import classes from '../StudentReport/StudentReport.module.css';

function StudentReport() {

    const param = useParams();

    const [studentDetails, setstudentDetails] = useState(null);

    const [quizStats, setquizStats] = useState([]);

    const [assignmentStats, setassignmentStats] = useState([]);

    const dispatch = useDispatch();

    const history = useHistory();

    const loading = useSelector(state => state.auth.loading);

    const location = useLocation();

    const { studentID } = location.state;

    const [message1, setmessage1] = useState("");

    const [message2, setmessage2] = useState("");

    useEffect(() => {
        async function Call(){
            dispatch(authActions.setLoading());
            fetch('http://localhost:4000/Teacher/GetStudentInfo',{
                method:'POST',
                body:JSON.stringify({
                    studentID:studentID
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    setstudentDetails(data.student);
                }
            })
            .catch(err => alert('SOMETHING WENT WRONG'));

            fetch('http://localhost:4000/Teacher/QuizStats',{
                method:'POST',
                body:JSON.stringify({
                    studentID:studentID,
                    teacherID:param.teacher,
                    deptID:param.dept,
                    courseID:param.courseID
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    setquizStats(data.quizStats)
                }else{
                    setmessage1('NOT ATTEMPTED ANY QUIZ YET')
                }
            })
            .catch(err => alert('SOMETHING WENT WRONG'))

            fetch('http://localhost:4000/Teacher/assignmentStats',{
                method:'POST',
                body:JSON.stringify({
                    studentID:studentID,
                    teacherID:param.teacher,
                    courseID:param.courseID
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    setassignmentStats(data.assignmentStats)
                }else{
                    setmessage2('NOT SUBMITTED ANY ASSIGNMENT YET');
                }
            })
            .catch(err => alert('SOMETHING WENT WRONG'));

            dispatch(authActions.setLoading());
        }
        Call();
    },[])

    async function unEnrollStudent(studentID){
        dispatch(authActions.setLoading());
        fetch('http://localhost:4000/Teacher/UnEnrollStudent',{
            method:'POST',
            body:JSON.stringify({
                studentID:studentID,
                courseID:param.courseID,
                deptID:param.dept,
                teacherID:param.teacher
            }),
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(authActions.setLoading());
            if(data.success){
                alert(data.message);
            }else{
                alert(data.message);
            }
            history.goBack();
        })
        .catch(err => {
            dispatch(authActions.setLoading());
            alert('SOMETHING WENT WRONG')
        });
    }

    let data1,data2 = null;

    if(assignmentStats.length!==0){
        data1 = assignmentStats.map(item => {
            return <li key={item.assignmentID} className="list-group-item"><span >{item.assignmentID}</span> <span style={{float:'right'}}>MARKS : {item.marks}/{item.maxMarks}</span></li>
        })
    }

    if(quizStats.length!==0){
        data2 = quizStats.map(item => {
            return <li key={item.quizID} className="list-group-item"><span >{item.quizID}</span> <span style={{float:'right'}}>MARKS : {item.marks}/{item.maxMarks}</span></li>
        })
    }

    return (
        loading ? <Spinner/> : <div className={classes.StudentReport}>
            <h1>STUDENT PERFORMANCE</h1>
            {studentDetails!==null && <div className='card' style={{margin:'3% auto',width:'50%'}}><div className='card-body'><h5>NAME : {studentDetails.name.toUpperCase()}{studentDetails.surname.toUpperCase()}</h5>
            <h5>STUDENT ID : {studentDetails.studentID}</h5>
            <h5>EMAIL : {studentDetails._id}</h5>
            <button style={{margin:'2% auto'}} className='btn btn-outline-primary' onClick={() => unEnrollStudent(studentID)}>UNENROLL</button>
            </div></div>}

            <h3>ASSIGNMENT</h3>
            <ul className="list-group" style={{width:'50%',margin:'3% auto'}}>
                {data1!==undefined ? data1 : message2}
            </ul>

            <h3>QUIZ</h3>
            <ul className="list-group" style={{width:'50%',margin:'3% auto'}}>
                {data2!==null ? data2 : message1}
            </ul>
            
        </div>
    )
}

export default StudentReport
