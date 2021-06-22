import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import classes from '../Assignment/Assignment.module.css';
import { storage } from '../../firebase';
import Spinner from '../../Spinner/Spinner';
import { authActions } from '../../Store/Auth';

function Assignment() {
    const location = useLocation();

    const { filename,fileurl,teacherID,lastsubmissionDate,maxMarks } = location.state;

    const [name, setname] = useState("");

    const [fileUrl, setfileUrl] = useState("");

    const [file, setfile] = useState(null);

    const [isSubmited, setisSubmited] = useState(false);

    const [submitedData, setsubmitedData] = useState(null);

    const studentID = useSelector(state => state.auth.id);

    const loading = useSelector(state => state.auth.loading);

    const dispatch = useDispatch();

    const param = useParams();

    const history = useHistory();

    useEffect(() => {
        if(fileUrl!==""){
            fetch('https://blooming-earth-19953.herokuapp.com/Student/AddSubmission',{
                method:'POST',
                body:JSON.stringify({
                    name:name,
                    fileUrl:fileUrl,
                    assignmentID:param.assignmentID,
                    teacherID:param.teacher,
                    studentID:studentID,
                    maxMarks:maxMarks,
                    courseID:param.CourseID
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
            })
            setfileUrl("");
        } 
 
     },[fileUrl,dispatch,history,maxMarks,param.assignmentID,param.teacher,studentID,name,param.CourseID])

    useEffect(()=>{
        async function Call(){        
            dispatch(authActions.setLoading());
            fetch('https://blooming-earth-19953.herokuapp.com/GetSubmissionStatus',{
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
                dispatch(authActions.setLoading());
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
                dispatch(authActions.setLoading());
                alert('ERROR OCCURED WHILE FETCHING DATA');
            })
        }
        if(submitedData===null){
            Call();
        }
    },[dispatch,isSubmited,teacherID,studentID,param.assignmentID,submitedData])

    function fileHandler(event){
        if(event.target.files[0]){
            setfile(event.target.files[0]);
        }
    }

    function nameHandler(event){
        setname(event.target.value);
    }

    

    async function formSubmitHandler(event){
        event.preventDefault();
        dispatch(authActions.setLoading());
        const uploadTask = storage.ref(`submissions/${file.name}`).put(file);
        uploadTask.on(
        "state_changed",
        snapshot => {
            
        },
        error => {
            dispatch(authActions.setLoading());
        },
        () => {
            storage
            .ref("submissions")
            .child(file.name)
            .getDownloadURL()
            .then(url => {
                setfileUrl(url)
            });
        }
        );
    }

    async function updateHandler(event){
        event.preventDefault();
        dispatch(authActions.setLoading());
        const uploadTask = storage.refFromURL(submitedData.data[0].fileUrl);
        uploadTask.delete()
        .then(() => {
            fetch('https://blooming-earth-19953.herokuapp.com/Student/DeleteSubmission',{
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
            })
            
            history.goBack();
        })
        .catch(err => {
            dispatch(authActions.setLoading());
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

    return loading ? <Spinner/> : <div className={classes.Assignment}>
    <div className='card' style={{width:"70%",margin:"5% auto",padding:"2%"}}>
        <div className='card-body'>
            <h1>{filename}</h1>
            <h1><button onClick={viewAssignmentHandler} className='btn btn-secondary btn-lg'>View Assignment</button></h1>
            {submitedData===null ?<h4>Submit Your Work</h4>:<h3>You have submitted Assignment on {x.toDateString()} <button style={{display:'block',margin:'5% auto'}} className='btn btn-secondary' onClick={viewHandler}>VIEW SUBMISSION</button> </h3>}
            {(submitedData!==null && x>y) && <h3>Assignment Submitted Late</h3>}
            {(submitedData!==null && x<=y) && <h3>Assignment Submitted On Time</h3>}
            {isSubmited===true && submitedData!==null && submitedData.data[0].marks!=='NG' ? marskInfo:null}
        </div>
    </div>
    {submitedData!==null && submitedData.data[0].marks === "NG" ? <div className="card" style={{width:"50%",margin:"5% auto",padding:"5%"}}>
        <form onSubmit={isSubmited===true ? updateHandler : formSubmitHandler}>
            {!isSubmited && <div>
                <div className="form-group">
                    <input value={name} onChange={nameHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Assignment Name"/>
                </div>
                <div className="form-group">
                    <input onChange={fileHandler} type="file" className="form-control" id="exampleFormControlFile1" placeholder="Select File"/>
                </div>
            </div>}
            <div className="form-group">
                <button className="btn btn-secondary btn-block">{isSubmited?"DELETE SUBMISSION":"Submit"}</button>
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
                    <input onChange={fileHandler} type="file" className="form-control" id="exampleFormControlFile1" placeholder="Select File"/>
                </div>
                <div className="form-group">
                    <button className="btn btn-dark btn-block">{isSubmited?"Update":"Submit"}</button>
                </div>   
            </form>
        </div>
    </div>:null}
</div>
}

export default Assignment
