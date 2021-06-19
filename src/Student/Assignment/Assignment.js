import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import classes from '../Assignment/Assignment.module.css';

function Assignment() {
    const location = useLocation();

    const { filename,fileurl,teacherID,lastsubmissionDate,maxMarks } = location.state;

    const [name, setname] = useState("");

    const [submissionDate, setsubmissionDate] = useState("");

    const [fileUrl, setfileUrl] = useState("");

    const id = useSelector(state => state.auth.id);

    const [isSubmited, setisSubmited] = useState(false);

    const [submitedData, setsubmitedData] = useState(null);

    const studentID = useSelector(state => state.auth.id);

    useEffect(()=>{
        async function Call(){
            fetch('http://localhost:4000/GetSubmissionStatus',{
                method:'POST',
                body:JSON.stringify({
                    studentID:studentID,
                    assignmentID:param.assignmentID,
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
                    setsubmitedData(data);
                    if(data.lentgh!==0){
                        setisSubmited(!isSubmited);
                    }
                }else{
                    setsubmitedData(null);
                }
            })
            .catch(err => {
                alert('ERROR OCCURED WHILE FETCHING DATA');
            })
        }
        Call();
    },[])

    function fileHandler(event){
        setfileUrl(event.target.value);
    }

    function dateHandler(event){
        setsubmissionDate(event.target.value);
    }

    function nameHandler(event){
        setname(event.target.value);
    }

    const param = useParams();

    const marks = 0;

    const history = useHistory();

    const newdate = new Date();

    async function formSubmitHandler(event){
        event.preventDefault();
        fetch('http://localhost:4000/Student/AddSubmission',{
            method:'POST',
            body:JSON.stringify({
                name:name,
                fileUrl:fileUrl,
                submissionDate:newdate,
                marks:marks,
                assignmentID:param.assignmentID,
                teacherID:param.teacher,
                studentID:studentID
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
                alert(data.message);
                history.goBack();
            }else{
                alert(data.message);
                history.goBack();
            }
        })
        .catch( err =>{
            alert('SOMETHING WENT WRONG');
        })
    }

    async function updateHandler(event){
        event.preventDefault();
        fetch('http://localhost:4000/Student/UpdateSubmission',{
            method:'POST',
            body:JSON.stringify({
                name:name,
                fileUrl:fileUrl,
                submissionDate:newdate,
                assignmentID:param.assignmentID,
                teacherID:param.teacher,
                studentID:studentID
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
                alert(data.message);
                history.goBack();
            }else{
                alert(data.message);
                history.goBack();
            }
        })
        .catch( err =>{
            alert('SOMETHING WENT WRONG');
        })
    }

    let x = null;

    if(submitedData!==null){
        x = new Date(submitedData.data[0].submissionDate);
    }

    const y = new Date(lastsubmissionDate);

    function viewHandler(){
        history.push({
            pathname:viewUrl,
            state:{
                fileUrl:submitedData.data[0].fileUrl
            }
        })
    }

    let viewUrl = '/Student/'+param.dept+'/'+param.teacher+'/Course/'+param.CourseID+'/Assignment/'+param.assignmentID+'/View';
 

    function viewAssignmentHandler(){
        const newviewUrl = viewUrl + 'Assignment'
        history.push({
            pathname:newviewUrl,
            state:{
                fileUrl:fileurl
            }
        })
    }

    let marskInfo = null;
    if(submitedData!==null && submitedData.data[0].marks!=='NG'){
        marskInfo = <h3>You got {submitedData.data[0].marks}/{maxMarks} </h3>
    }

    return (
        <div className={classes.Assignment}>
            <div className='card' style={{width:"70%",margin:"5% auto",padding:"2%"}}>
                <div className='card-body'>
                    <h1>{filename}</h1>
                    <h1><button onClick={viewAssignmentHandler} className='btn btn-secondary btn-lg'>View Assignment</button></h1>
                    {submitedData===null ?<h1>Submit Your Work</h1>:<h3>You have submitted Assignment on {x.toDateString()} <h1><button className='btn btn-secondary' onClick={viewHandler}>VIEW SUBMISSION</button></h1> </h3>}
                    {(submitedData!==null && x>y) && <h3>Assignment Submitted Late</h3>}
                    {(submitedData!==null && x<=y) && <h3>Assignment Submitted On Time</h3>}
                    {isSubmited===true && submitedData!==null && submitedData.data[0].marks!=='NG' ? marskInfo:null}
                </div>
            </div>
            {submitedData!==null && submitedData.data[0].marks === "NG" ? <div className="card" style={{width:"30%",margin:"5% auto",padding:"5%"}}>
                <form onSubmit={isSubmited===true ? updateHandler : formSubmitHandler}>
                    <div className="form-group">
                        <input value={name} onChange={nameHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Assignment Name"/>
                    </div>
                    <div className="form-group">
                        <input value={fileUrl} onChange={fileHandler} type="text" className="form-control" id="exampleFormControlFile1" placeholder="Enter File Url"/>
                    </div>
                    <div className="form-group">
                        <input value={submissionDate} onChange={dateHandler} type="date" className="form-control" id="exampleFormControlFile1" placeholder="Enter Submission Deadline"/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-dark btn-block">{isSubmited?"Update":"Submit"}</button>
                    </div>   
                </form>
            </div>:submitedData===null ? 
            <div className="card" style={{width:"30%",margin:"5% auto",padding:"5%"}}>
                <div>
                    <form onSubmit={isSubmited===true ? updateHandler : formSubmitHandler}>
                        <div className="form-group">
                            <input value={name} onChange={nameHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Assignment Name"/>
                        </div>
                        <div className="form-group">
                            <input value={fileUrl} onChange={fileHandler} type="text" className="form-control" id="exampleFormControlFile1" placeholder="Enter File Url"/>
                        </div>
                        <div className="form-group">
                            <input value={submissionDate} onChange={dateHandler} type="date" className="form-control" id="exampleFormControlFile1" placeholder="Enter Submission Deadline"/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-dark btn-block">{isSubmited?"Update":"Submit"}</button>
                        </div>   
                    </form>
                </div>
            </div>:null}
        </div>
    )
}

export default Assignment
