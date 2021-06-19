import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { authActions } from '../../Store/Auth';
import classes from '../AdminLogin/AdminLogin.module.css';
import Spinner from "../../Spinner/Spinner";


function AdminLogin() {

    const dispatch = useDispatch();

    const Loading = useSelector(state => state.auth.loading);

    const history = useHistory();

    const [error, seterror] = useState(null);

    const [isSignIn, setisSignIn] = useState(false);

    const [email, setemail] = useState("");

    const [password, setpassword] = useState("");

    const [name, setname] = useState("");

    const [surname, setsurname] = useState("");

    const [id, setid] = useState("");

    const [confpassword, setconfpassword] = useState("");

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
        let url = 'http://localhost:4000/Admin/';
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
                adminID:id,
                name:name,
                surname:surname,
                password:password
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
                dispatch(authActions.login({id:data.id,name:data.name,surname:data.surname,userType:"Admin"}));
                history.replace('/Admin/Home');
            }else{
                seterror(data.message);
            }
        }).catch((error) => {
             dispatch(authActions.setLoading());
            alert('Some Error Occured');
        });
    }

    return (
        Loading ===true ? <Spinner/>:<div className={classes.AdminLogin}>
        <h1>{isSignIn?'ADMIN SIGN IN':'ADMIN SIGN UP'}</h1>
        <form onSubmit={formSubmitHandler}>
            <div className="card" style={{width:"70%",margin:"5% auto",padding:"5%"}}>
                {error!==null ? <h2>{error}</h2>:null}
                <div className="card-body">
                    {!isSignIn?<div className="form-group">
                        <input value={name} onChange={nameHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Name"/>
                    </div>:null}
                   {!isSignIn? <div className="form-group">
                        <input value={surname} onChange={surnameHandler} required type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter Surname"/>
                    </div>:null}
                    <div className="form-group">
                        <input value={email} onChange={emailHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Email"/>
                    </div>
                    {!isSignIn? <div className="form-group">
                        <input value={id} required type="text" onChange={idHandler} className="form-control" id="formGroupExampleInput4" placeholder="Enter Admin ID"/>
                    </div>:null}
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

export default AdminLogin
