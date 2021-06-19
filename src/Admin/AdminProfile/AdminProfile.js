import React from 'react';
import classes from '../AdminProfile/AdminProfile.module.css';

function AdminProfile() {

    return (
        <div className={classes.AdminProfile}>
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
            </div>
        </div>
    )
}

export default AdminProfile
