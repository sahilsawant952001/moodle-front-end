import React, { Profiler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Spinner from '../../Spinner/Spinner';
import { authActions } from '../../Store/Auth';
import classes from '../StudentLogin/StudentLogin.module.css';


function StudentLogin() {

    const history = useHistory();

    const loading = useSelector(state => state.auth.loading);

    
    const dispatch = useDispatch();

    const [isSignIn, setisSignIn] = useState(false);

    const [error, seterror] = useState(null);

    const [email, setemail] = useState("");

    const [password, setpassword] = useState("");

    const [name, setname] = useState("");

    const [surname, setsurname] = useState("");

    const [id, setid] = useState("");

    const [confpassword, setconfpassword] = useState("");

    const [dept, setdept] = useState("");

    function deptHandler(event){
        setdept(event.target.value);
    }

    function emailHandler(event){
        setemail(event.target.value);
    }

    function passwordHandler(event){
        setpassword(event.target.value);
    }

    function nameHandler(event){
        setname(event.target.value);
    }

    function surnameHandler(event){
        setsurname(event.target.value);
    }

    function idHandler(event){
        setid(event.target.value);
    }

    function confpasswordHandler(event){
        setconfpassword(event.target.value);
    }
    
    async function formSubmitHandler(event){
        event.preventDefault();
        dispatch(authActions.setLoading());
        let url = 'http://localhost:4000/Student/';
        let authBody = null;
        
        if(isSignIn){
            url = url + 'SignIn';
            authBody = {
                email:email,
                password:password
            }
        }else{
            url = url + 'SignUp';
            authBody = {
                email:email,
                studentID:id,
                name:name,
                surname:surname,
                password:password,
                dept:dept,
            }
        }
        
        fetch(url,{
            method:'POST',
            mode:'cors',
            body:JSON.stringify(authBody),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then( res => {
            return res.json();
        }).then( data => {
            dispatch(authActions.setLoading());
            if(data.authenticatedUser){
                dispatch(authActions.login({
                    id:data.id,
                    name:data.name,
                    surname:data.surname,
                    userType:'Student',
                    dept:data.dept,
                    deptname:data.deptname,
                    email:email
                }));
                const url2 = '/Student/'+data.dept;
                history.replace(url2);
            }else{
                seterror(data.message);
            }
        }).catch((err) => {
             dispatch(authActions.setLoading());
             alert('Some Error Occured');
        });
    }

    // console.log(profile)

    return (
        loading === true ? <Spinner/> : <div className={classes.StudentLogin}>
        <h1>{isSignIn?'STUDENT SIGN IN':'STUDENT SIGN UP'}</h1>
        <form onSubmit={formSubmitHandler}>
            <div className="card" style={{width:"70%",margin:"5% auto",padding:"5%"}}>
                {error!==null ? <h2>{error}</h2>:null}
                <div className="card-body">
                    {!isSignIn?<div className="form-group">
                        <input value={name} onChange={nameHandler}  required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Name"/>
                    </div>:null}
                   {!isSignIn? <div className="form-group">
                        <input value={surname} onChange={surnameHandler} required type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter Surname"/>
                    </div>:null}
                    <div className="form-group">
                        <input value={email} onChange={emailHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Email"/>
                    </div>
                    {!isSignIn? <div className="form-group">
                        <input value={id} required type="text" onChange={idHandler} className="form-control" id="formGroupExampleInput4" placeholder="Enter Student ID"/>
                    </div>:null}
                    {!isSignIn? <div className="form-group"><select onChange={deptHandler} className="form-control form-select form-select-sm" aria-label=".form-select-sm example" value={dept}>
                    <option value="null">Select Your Department...</option>
                    <option value="CSE">Computer Science Engineering</option>
                    <option value="IT">Information Technology</option>
                    <option value="EXTC">Electronics And Telecommunication</option>
                    <option value="ETRX">Electronics Engineering</option>
                    </select></div>:null}
                    <div className="form-group">
                        <input value={password} onChange={passwordHandler} required type="text" className="form-control" id="formGroupExampleInput5" placeholder="Enter Password"/>
                    </div>
                    {!isSignIn?<div className="form-group">
                        <input value={confpassword} onChange={confpasswordHandler} required type="text" className="form-control" id="formGroupExampleInput6" placeholder="Confirm Password"/>
                    </div>:null}
                    <div className="form-group">
                        <button id={classes.submitbtn}  className="btn btn-dark btn-block">{!isSignIn?"SIGN UP":"SIGN IN"}</button>
                    </div>
                    <div className="form-group">
                        <button id={classes.submitbtn} className="btn btn-outline-dark btn-block" onClick={ () => setisSignIn(!isSignIn) } >{isSignIn?"Switch To Sign Up":"Switch To Sign In"}</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    )
}

export default StudentLogin
