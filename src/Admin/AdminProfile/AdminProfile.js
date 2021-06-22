import React from 'react';
import { useSelector } from 'react-redux';
import classes from '../AdminProfile/AdminProfile.module.css';

function AdminProfile() {

    const user = useSelector(state => state.auth);

    return (
        <div className={classes.AdminProfile}>
            <div className="card" style={{width:"50%",margin:"5% auto",padding:"5%"}}>
                <div className="card-body">
                    <img height='20%' width='20%' src='https://static.vecteezy.com/system/resources/thumbnails/000/550/731/small_2x/user_icon_004.jpg' alt='profile'/>
                </div>
                <div className="card" style={{width:"100%",margin:"5% auto",padding:"5%"}}>
                    <div className="card-body">
                        <h5>Name : {user.name}</h5>
                        <h5>Surname : {user.surname}</h5>
                        <h5>Email : {user.email}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProfile
