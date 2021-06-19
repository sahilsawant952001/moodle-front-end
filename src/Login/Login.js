import classes from '../Login/Login.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className={classes.Login}>
            <h1>Welcome To Sardar Patel Institute Of Technology</h1>
            <img alt='img' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Spit.jpg/273px-Spit.jpg' style={{display:"block",height:"50%",width:"50%",margin:"5% auto"}}></img>
            <div className="row">
                <div className="col-lg-4" style={{width:"100%",margin:"3% auto",display:"inline-block"}}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">ADMIN</h5>
                            <Link to='/Login/AdminLogin' className="btn btn-dark btn-block">SIGN UP</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4" style={{width:"100%",margin:"3% auto",display:"inline-block"}}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">TEACHER</h5>
                            <Link to="/Login/TeacherLogin" className="btn btn-dark btn-block">SIGN UP</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4" style={{width:"100%",margin:"3% auto",display:"inline-block"}}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">STUDENTS</h5>
                            <Link to="/Login/StudentLogin" className="btn btn-dark btn-block">SIGN UP</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
