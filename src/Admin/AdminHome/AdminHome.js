import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../AdminHome/AdminHome.module.css';


function AdminHome() {
    return (
        <div className={classes.AdminHome}>
            <h1 style={{margin:"3% 0"}}>Admin Panel</h1>
            <ul className="list-group" style={{width:"50%",margin:"5% auto"}}>
                <Link to='/Admin/AddDepartment'><li className="list-group-item">Add Department</li></Link>
                <Link to='/Admin/RemoveDepartment'><li className="list-group-item">Remove Department</li></Link>
                <Link to='/Admin/AddTeacher'><li className="list-group-item">Add Teacher</li></Link>
                <Link to='/Admin/RemoveTeacher'><li className="list-group-item">Remove Teacher</li></Link>
                <Link to='/Admin/AddStudent'><li className="list-group-item">Add Student</li></Link>
                <Link to='/Admin/RemoveStudent'><li className="list-group-item">Remove Student</li></Link>
            </ul>
        </div>
    )
}

export default AdminHome
