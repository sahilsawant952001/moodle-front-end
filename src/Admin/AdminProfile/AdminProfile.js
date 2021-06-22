import React from 'react';
import classes from '../AdminProfile/AdminProfile.module.css';

function AdminProfile() {

    return (
        <div className={classes.AdminProfile}>
            <div className="card" style={{width:"50%",margin:"5% auto",padding:"5%"}}>
                <div className="card-body">
                    <img height='20%' width='20%' src='https://static.vecteezy.com/system/resources/thumbnails/000/550/731/small_2x/user_icon_004.jpg' alt='profile'/>
                    <h1 style={{margin:'auto 3%'}}>Sahil Sawant</h1>
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
