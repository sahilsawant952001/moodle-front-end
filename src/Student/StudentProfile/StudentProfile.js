import React from 'react';
import { useSelector } from 'react-redux';
import classes from '../StudentProfile/StudentProfile.module.css';

function StudentProfile() {

    const profile = useSelector(state => state.auth);

    return (
        <div className={classes.StudentProfile}>
            <div className="card" style={{width:"50%",margin:"5% auto",padding:"5%"}}>
                <div className="card-body">
                    <img height='20%' width='20%' src='https://static.vecteezy.com/system/resources/thumbnails/000/550/731/small_2x/user_icon_004.jpg' alt='profile'/>
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
