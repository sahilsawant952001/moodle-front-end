import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import classes from '../Submission/Submission.module.css';
import Spinner from '../../Spinner/Spinner';
import { authActions } from '../../Store/Auth';

function Submission() {
    const param = useParams();

    const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.loading);

    const history = useHistory();

    const [marks, setmarks] = useState("");

    const [feedback, setfeedback] = useState("");

    const location = useLocation();

    const {fileUrl,maxMarks,lastSubmissionDate,dateSubmitted,givenMarks,studentID } = location.state;


    function marksHandler(event){
        setmarks(event.target.value);
    }

    function feedbackHandler(event){
        setfeedback(event.target.value);
    }

    async function formSubmitHandler(event){
        event.preventDefault();
        dispatch(authActions.setLoading());
        const url = 'https://blooming-earth-19953.herokuapp.com/Teacher/Evaluate';
        fetch(url,{
            method:'POST',
            body:JSON.stringify({
                teacherID:param.teacher,
                studentID:studentID,
                assignmentID:param.assignmentID,
                marks:marks,
                feedback:feedback,
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
                alert('Evaluation Successful');
            }else{
                alert('Evaluation Failed');
            }
            history.goBack();
        })
        .catch( err => {
            dispatch(authActions.setLoading());
            alert('SOMETHING WENT WRONG');
        })
    }

    const x = new Date(dateSubmitted);
    const y = new Date(lastSubmissionDate);

    let submissionInfo = null;

    if(x<=y){
        submissionInfo = 'Assignment Submitted On Time';
    }else{
        submissionInfo = 'Assignment Submitted Late';
    }

    let marksinfo = null;

    if(givenMarks==='NG'){
        marksinfo = 'Assignment Not Evaluated';
    }else{
        marksinfo = givenMarks+'/'+maxMarks;
    }

    return (
        loading ? <Spinner/> : <div className={classes.Submission}>
        <h1>Submission Details</h1>
        <div className='card' style={{margin:'4% auto',width:'50%'}}>
            <div className='card-body'>
                <h6>Student ID : {param.submissionID}</h6>
                <h6>Submission Status : {submissionInfo}</h6>
                <h6>Marks : {marksinfo}</h6>
                <h6>Submission Date : {new Date(dateSubmitted).toDateString()}</h6>
            </div>
        </div>
        <embed src={fileUrl} width="800px" height="700px" style={{margin:"3%"}} />
        <div>
        <h3>Evaluate</h3>
        <form onSubmit={formSubmitHandler}>
            <div className="card" style={{width:"70%",margin:"5% auto",padding:"5%"}}>
                <div className="form-group">
                    <input value={marks} onChange={marksHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Marks"/>
                </div>
                <div className="form-group">
                    <input value={feedback} onChange={feedbackHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Feedback"/>
                </div>
                <div className="form-group">
                    <button className="btn btn-dark btn-block">Submit</button>
                </div>   
            </div>
        </form></div>
    </div>
    )
}

export default Submission
