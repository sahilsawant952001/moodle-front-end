import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from '../StudentProfile/StudentProfile.module.css';

function StudentProfile() {

    const [myCourses, setmyCourses] = useState([]);

    const profile = useSelector(state => state.auth);

    return (
        <div className={classes.StudentProfile}>
            <div className="card" style={{width:"50%",margin:"5% auto",padding:"5%"}}>
                <div className="card-body">
                    <img src='https://moodle.spit.ac.in/pluginfile.php/27651/user/icon/clean/f1?rev=2728449' alt='profile'/>
                </div>
                <div className="card" style={{width:"100%",margin:"5% auto",padding:"5%"}}>
                    <div className="card-body">
                        <h5>Name : {profile.name}</h5>
                        <h5>Surname : {profile.surname}</h5>
                        <h5>Email : {profile.email}</h5>
                        <h5>Branch : {profile.deptname.toLowerCase()}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentProfile
