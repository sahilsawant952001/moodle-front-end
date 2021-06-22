import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classes from '../AllAttempts/AllAttempts.module.css';
import Spinner from '../../Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store/Auth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function AllAttempts() {

    const param = useParams();

    const [attemptInfo, setattemptInfo] = useState([]);

    const [quizInfo, setquizInfo] = useState([]);

    let data = null;

    const loading = useSelector(state => state.auth.loading);

    const dispatch = useDispatch();

    const [message, setmessage] = useState("");

    const history = useHistory();

    useEffect(() => {
        async function Call(){
            dispatch(authActions.setLoading());
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
                dispatch(authActions.setLoading());
                if(data.success){
                    setquizInfo(data.quizInfo[0]);
                    setattemptInfo(data.attemptInfo); 
                }else{
                    setmessage("NO ATTEMPTS FOR THIS QUIZ");
                }
            })
            .catch(err => {
                dispatch(authActions.setLoading());
            })
        }
        Call();
    },[])

    if(quizInfo!==null && attemptInfo.length!==0){
        data = attemptInfo.map( item => {
            const url = '/Teacher/'+param.dept+'/'+param.teacher+'/Course/'+param.courseID+'/Quiz/'+param.quizID+'/Attempt/'+item.studentID;
            return <Link key={item.studentID} to={{
                pathname:url,
                state:{
                    quizInfo:quizInfo,
                    attemptInfo:item
                }
            }}><li className="list-group-item">{item.studentID}</li></Link>
        })    
    }

    async function deleteQuiz(){
        dispatch(authActions.setLoading());
        fetch('http://localhost:4000/Teacher/DeleteQuiz',{
            method:'POST',
            body:JSON.stringify({
                courseID:param.courseID,
                teacherID:param.teacher,
                deptID:param.dept,
                quizID:param.quizID
            }),
            headers:{
                'Content-Type':'application/json'
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
            history.goBack();
        })
    }

    return (
        loading ? <Spinner/> : <div className={classes.AllAttempts}>
        <h1>{quizInfo.quizName} Attempts</h1>
        <button className='btn btn-outline-primary' onClick={deleteQuiz}>DELETE QUIZ</button>
        <ul className="list-group" style={{width:"50%",margin:"5% auto"}}>
            {data!==null ? data : message}
        </ul>
    </div>
    )
}

export default AllAttempts
