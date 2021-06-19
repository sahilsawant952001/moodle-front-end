import classes from '../StudentHome/StudentHome.module.css';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

function StudentHome() {

    const deptname = useSelector(state => state.auth.deptname);

    const dept = useSelector(state => state.auth.dept);

    const [error, seterror] = useState(null);

    const [teacherData, setteacherData] = useState([]);

    useEffect(() => {
        async function Call(){
            const url = 'http://localhost:4000/GetTeachers';
            fetch(url,{
                method:'POST',
                body:JSON.stringify({
                    dept:dept
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then( res => {
                return res.json();
            })
            .then( data => {
                setteacherData(data);
            })
            .catch( err => {
                alert('SOME ERROR OCCURED!')
            })
        }

        Call();
    },[])

    let data = null;

    if(teacherData!==null){
        data = teacherData.map( item => {
            const url = '/Student/' + dept +'/'+ item.teacherID;
            return <Link key={item.teacherID} to={{
                pathname:url,
                state:{
                    teacherName:item.name,
                    teacherSurname:item.surname,
                    teacherEmail:item._id,
                    teacherID:item.teacherID
                }
            }}><li className="list-group-item">{item.name+" "+item.surname}</li></Link>
        })
    }
    
    return (
        <div className={classes.StudentHome}>
            <h1>WELCOME TO {deptname} DEPARTMENT</h1>
            <br/><br/>
            <h4>TEACHERS</h4>
            <ul className="list-group" style={{width:"50%",margin:"5% auto"}}>
                {data}
            </ul>
        </div>
    )
}


export default StudentHome
