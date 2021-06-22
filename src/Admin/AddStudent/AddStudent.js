import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../Store/Auth';
import classes from '../AddStudent/AddStudent.module.css';
import Spinner from '../../Spinner/Spinner';

function AddStudent() {

    const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.loading);

    const [id, setid] = useState("");

    function idHandler(event){
        setid(event.target.value);
    }

    const [name, setname] = useState("");

    function nameHandler(event){
        setname(event.target.value);
    }

    const [email, setemail] = useState("");

    function emailHandler(event){
        setemail(event.target.value);
    }

    const [password, setpassword] = useState("");

    function passwordHandler(event){
        setpassword(event.target.value);
    }

    const [dept, setdept] = useState("");

    function deptHandler(event){
        setdept(event.target.value);
    }

    const [surname, setsurname] = useState("");

    function surnameHandler(event){
        setsurname(event.target.value);
    }

    const history = useHistory();

    async function formSubmitHandler(event){
        event.preventDefault();
        dispatch(authActions.setLoading());
        let url = 'http://localhost:4000/Student/SignUp';
        let body = {
            email:email,
            studentID:id,
            name:name,
            surname:surname,
            password:password,
            dept:dept,
        }
        fetch(url,{
            method:'POST',
            mode:'cors',
            body:JSON.stringify(body),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then( res => {
            return res.json();
        }).then( data => {
            dispatch(authActions.setLoading());
            if(data.authenticatedUser){
                alert('SUCCESSFULLY ADDED STUDENT');
                history.goBack();
            }else{
                alert('FAILED TO ADD STUDENT');
                history.goBack();
            }
        }).catch((err) => {
                dispatch(authActions.setLoading());
                alert('FAILED TO ADD STUDENT');
        });
    }

    return loading ? <Spinner/> : <div className={classes.AddStudent}>
                <h1>Add Student</h1>
                <div className="card" style={{width:"50%",margin:"5% auto",padding:"5%"}}>
                    <form onSubmit={formSubmitHandler}>
                        <div className="form-group">
                            <input value={id} onChange={idHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Unique ID for Student"/>
                        </div>
                        <div className="form-group">
                            <input value={name} onChange={nameHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Student Name"/>
                        </div>
                        <div className="form-group">
                            <input value={surname} onChange={surnameHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Student Surname"/>
                        </div>
                        <div className="form-group">
                            <input value={email} onChange={emailHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Student Email"/>
                        </div>
                        <div className="form-group">
                            <input value={dept} onChange={deptHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Student Department"/>
                        </div>
                        <div className="form-group">
                            <input value={password} onChange={passwordHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Student Password"/>
                        </div>
                        <div className="form-group">
                            <button id={classes.submitbtn}  className="btn btn-dark btn-block">Add Student</button>
                        </div>
                    </form>
                </div>
            </div>
}

export default AddStudent
