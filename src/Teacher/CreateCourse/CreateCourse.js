import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import classes from '../CreateCourse/CreateCourse.module.css';
import Spinner from '../../Spinner/Spinner';

function CreateCourse() {
    const param = useParams();

    const [id, setid] = useState("");

    const [name, setname] = useState("");

    const [enrollKey, setenrollKey] = useState("");

    function idHandler(event){
        setid(event.target.value);
    }

    function nameHandler(event){
        setname(event.target.value);
    }

    function enrollKeyHandler(event){
        setenrollKey(event.target.value);
    }

    function formSubmitHandler(event){
        event.preventDefault();
        alert('Successfully Created Course');
        history.goBack();
    }

    const teacherID = useSelector(state => state.auth.id);

    const history = useHistory();

    async function Call(event){
        event.preventDefault();
        fetch('http://localhost:4000/CreateCourse',{
            method:'POST',
            body:JSON.stringify({
                courseID:id,
                courseName:name,
                enrollKey:enrollKey,
                teacherID:teacherID
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then( res => {
            return res.json();
        })
        .then( data =>{
            alert(data.message);
            history.goBack();
        })
        .catch((err) => {
            alert('SOMETHING WENT WRONG');
        })
    }

    const loading = useSelector(state => state.auth.loading);

    return (
        loading ===true ? <Spinner/>:<div className={classes.CreateCourse}>
        <h1>Create Course</h1>
        <form onSubmit={Call}>
            <div className="card" style={{width:"70%",margin:"5% auto",padding:"5%"}}>
                <div className="form-group">
                    <input value={id} onChange={idHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Unique ID For Course"/>
                </div>
                <div className="form-group">
                    <input value={name} onChange={nameHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Course Name"/>
                </div>
                <div className="form-group">
                    <input value={enrollKey} onChange={enrollKeyHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Enrollment Key"/>
                </div>
                <div className="form-group">
                    <button className="btn btn-dark btn-block">Create</button>
                </div>      
            </div>
        </form>
    </div>
    )
}

export default CreateCourse
