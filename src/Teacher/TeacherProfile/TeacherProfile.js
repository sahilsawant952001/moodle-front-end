import React, { useState } from 'react'
import classes from '../TeacherProfile/TeacherProfile.module.css';

function StudentProfile() {

    const [myCourses, setmyCourses] = useState([])

    return (
        <div>
            <div className="card" style={{width:"50%",margin:"5% auto",padding:"5%"}}>
                <div className="card-body">
                    <img src='https://moodle.spit.ac.in/pluginfile.php/27651/user/icon/clean/f1?rev=2728449' alt='profile'/><h1 style={{display:'inline',margin:'auto 3%'}}>Sahil Sawant</h1>
                </div>
                <div className="card" style={{width:"100%",margin:"5% auto",padding:"5%"}}>
                    <div className="card-body">
                        <h5>Email : sahil.sawant3@spit.ac.in</h5>
                        <h5>Country : India</h5>
                        <h5>City : Thane</h5>
                        <h5>Branch : Information Technology</h5>
                    </div>
                </div>
                <h3>Created Courses</h3>
                <div className="card" style={{width:"100%",margin:"5% auto",padding:"5%"}}>
                    <div className="card-body">
                        <h6>Operating Systems</h6>
                        <h6>Computer Networks</h6>
                        <h6>Design And Analysis Of Algorithms</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentProfile
