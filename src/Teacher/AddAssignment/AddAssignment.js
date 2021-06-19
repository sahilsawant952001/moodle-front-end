import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import classes from '../AddAssignment/AddAssignment.module.css';

function AddAssignment() {

    const history = useHistory();

    const param = useParams();

    const [id, setid] = useState("");

    const [name, setname] = useState("");

    const [fileurl, setfileurl] = useState("");
    
    const [submissionDate, setsubmissionDate] = useState(null);

    const [marks, setmarks] = useState("");

    function marksHandler(event){
        setmarks(event.target.value);
    }

    function dateHandler(event){
        setsubmissionDate(event.target.value);
    }

    function idHandler(event){
        setid(event.target.value);
    }

    function nameHandler(event){
        setname(event.target.value);
    }

    function fileHandler(event){
        setfileurl(event.target.value);
    }

    function formSubmitHandler(event){
        event.preventDefault();
        fetch('http://localhost:4000/AddAssignment',{
            method:'POST',
            body:JSON.stringify({
                id:id,
                name:name,
                courseID:param.courseID,
                fileUrl:fileurl,
                submissionDate:submissionDate,
                marks:marks,
                teacherID:param.teacher
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
            }
        })
        .catch( err => {
            alert('SOMETHING WENT WRONG');
        })
    }

    return (
        <div className={classes.AddAssignment}>
            <h1>Add Assignment</h1>
            <form onSubmit={formSubmitHandler}>
                <div className="card" style={{width:"70%",margin:"5% auto",padding:"5%"}}>
                    <div className="form-group">
                        <input value={id} onChange={idHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Unique ID For Assignment"/>
                    </div>
                    <div className="form-group">
                        <input value={name} onChange={nameHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Assignment Name"/>
                    </div>
                    <div className="form-group">
                        <input value={fileurl} onChange={fileHandler} type="text" className="form-control" id="exampleFormControlFile1" placeholder="Enter File Url"/>
                    </div>
                    <div className="form-group">
                        <input value={submissionDate} onChange={dateHandler} type="date" className="form-control" id="exampleFormControlFile1" placeholder="Enter Submission Deadline"/>
                    </div>
                    <div className="form-group">
                        <input value={marks} onChange={marksHandler} type="text" className="form-control" id="exampleFormControlFile1" placeholder="Enter Maximum Marks"/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-dark btn-block">Create</button>
                    </div>      
                </div>
            </form>
        </div>
    )
}

export default AddAssignment
