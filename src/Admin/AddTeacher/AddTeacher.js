import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../Store/Auth';
import classes from '../AddTeacher/AddTeacher.module.css';
import Spinner from '../../Spinner/Spinner';

function AddTeacher() {

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

    const dispatch = useDispatch();

    const history = useHistory();

    const loading = useSelector(state => state.auth.loading);

    async function formSubmitHandler(event){
        event.preventDefault();
        dispatch(authActions.setLoading());
        let url = 'https://blooming-earth-19953.herokuapp.com/Teacher/SignUp';
        let body = {
            email:email,
            teacherID:id,
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
                alert('SUCCESSFULLY ADDED TEACHER');
                history.goBack();
            }else{
                alert('FAILED TO ADD TEACHER');
                history.goBack();
            }
        }).catch((err) => {
                dispatch(authActions.setLoading());
                alert('FAILED TO ADD TEACHER');
        });
    }

    return loading ? <Spinner/> : <div className={classes.AddTeacher}>
                <h1>Add Teacher</h1>
                <div className="card" style={{width:"50%",margin:"5% auto",padding:"5%"}}>
                    <form onSubmit={formSubmitHandler}>
                        <div className="form-group">
                            <input value={id} onChange={idHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Unique Teacher ID"/>
                        </div>
                        <div className="form-group">
                            <input value={name} onChange={nameHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Teacher Name"/>
                        </div>
                        <div className="form-group">
                            <input value={surname} onChange={surnameHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Teacher Surname"/>
                        </div>
                        <div className="form-group">
                            <input value={email} onChange={emailHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Teacher Email"/>
                        </div>
                        <div className="form-group">
                            <input value={dept} onChange={deptHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Department Of Teacher"/>
                        </div>
                        <div className="form-group">
                            <input value={password} onChange={passwordHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Password"/>
                        </div>
                        <div className="form-group">
                            <button id={classes.submitbtn}  className="btn btn-dark btn-block">Add Teacher</button>
                        </div>
                    </form>
                </div>
            </div>
        
}

export default AddTeacher
