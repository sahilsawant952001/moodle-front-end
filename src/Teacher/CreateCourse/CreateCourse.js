import React, { useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import classes from '../CreateCourse/CreateCourse.module.css';
import Spinner from '../../Spinner/Spinner';
import { authActions } from '../../Store/Auth';

function CreateCourse() {
 
    const dispatch = useDispatch();

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

    const teacherID = useSelector(state => state.auth.id);

    const history = useHistory();

    async function Call(event){
        event.preventDefault();
        dispatch(authActions.setLoading());
        fetch('https://blooming-earth-19953.herokuapp.com/CreateCourse',{
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
            dispatch(authActions.setLoading());
            alert(data.message);
            history.goBack();
        })
        .catch((err) => {
            dispatch(authActions.setLoading());
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
