import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import classes from '../AllSubmissions/AllSubmissions.module.css';
import Spinner from '../../Spinner/Spinner';
import { authActions } from '../../Store/Auth';
import { storage } from '../../firebase';

function AllSubmissions() {

    const param = useParams();

    const history = useHistory();

    const location = useLocation();

    const { fileUrl,name,maxMarks,submissionDate } = location.state;

    const [Submissions, setSubmissions] = useState([]);

    const loading = useSelector(state => state.auth.loading);

    const dispatch = useDispatch();

    useEffect( () => {
        async function Call(){
            dispatch(authActions.setLoading());
            fetch('https://blooming-earth-19953.herokuapp.com/Teacher/GetSubmissions',{
                method:'POST',
                body:JSON.stringify({
                    teacherID:param.teacher,
                    assignmentID:param.assignmentID
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then( res => {
                return res.json();
            })
            .then( data => {
                dispatch(authActions.setLoading());
                if(data.success){
                    setSubmissions(data.data);
                }else{
                    
                }
            })
            .catch( err => {
                dispatch(authActions.setLoading());
                alert('SOMETHING WENT WRONG');
            })
        }
        Call();
    },[dispatch,param.assignmentID,param.teacher])

    let data = 'No Submissions';

    if(Submissions.length!==0){
        data = Submissions.map( item => {
            const url = '/Teacher/'+param.dept+'/'+param.teacher+'/Course/'+param.courseID+'/Assignments/'+param.assignmentID+'/Submissions/'+item.studentID;
            return <Link key={item.studentID} to={{
                pathname:url,
                state:{
                    fileUrl:item.fileUrl,
                    maxMarks:maxMarks,
                    lastSubmissionDate:submissionDate,
                    dateSubmitted:item.submissionDate,
                    givenMarks:item.marks,
                    studentID:item.studentID
                }
            }}><li className="list-group-item">{item.studentID}</li></Link>
        } )
    }

    let viewUrl = '/Teacher/'+param.dept+'/'+param.teacher+'/Course/'+param.courseID+'/Assignments/'+param.assignmentID+'/ViewAssignment';

    function ViewAssignmentHandler(){
        history.push({
            pathname:viewUrl,
            state:{
                fileUrl:fileUrl
            }
        })
    }

    function deleteHandler(event){
        event.preventDefault();
        dispatch(authActions.setLoading());
        const uploadTask = storage.refFromURL(fileUrl);
        uploadTask.delete()
        .then(() => {
            fetch('https://blooming-earth-19953.herokuapp.com/Teacher/Delete/Assignment',{
                method:'POST',
                body:JSON.stringify({
                    teacherID:param.teacher,
                    fileUrl:fileUrl,
                    courseID:param.courseID
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then( res => {
                return res.json();
            })
            .then( data => {
                dispatch(authActions.setLoading());
                if(data.success){
                    alert(data.message);
                    history.goBack();
                }else{
                    alert(data.message);
                    history.goBack();
                }
            })
            .catch( err =>{
                dispatch(authActions.setLoading());
                alert('SOMETHING WENT WRONG');
                history.goBack();
            })
        })
        .catch(err => {
            dispatch(authActions.setLoading());
            alert('SOMETHING WENT WRONG');
        })
    }


    return (
        loading ? <Spinner/> : <div className={classes.AllSubmissions}>
        <div className='card' style={{margin:'3% auto',width:'50%'}}>
            <div className='card-body'>
                <h1>{name}</h1>
                <h1><button className='btn btn-secondary btn-lg' onClick={ViewAssignmentHandler}>View Assignment</button></h1>
                <h1><button className='btn btn-secondary btn-lg' onClick={deleteHandler}>Delete Assignment</button></h1>
            </div>
        </div>
        <h3>Submissions</h3>
        <ul className="list-group" style={{width:"50%",margin:"5% auto"}}>
            {data}
        </ul>
    </div>
    )
}

export default AllSubmissions
