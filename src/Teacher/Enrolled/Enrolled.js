import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { authActions } from '../../Store/Auth';
import classes from '../Enrolled/Enrolled.module.css';
import Spinner from '../../Spinner/Spinner';

function Enrolled() {

    const param = useParams();

    const [enrolled, setenrolled] = useState([]);

    const loading = useSelector(state => state.auth.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        async function Call(){
            dispatch(authActions.setLoading());
            fetch('http://localhost:4000/Teacher/Enrolled',{
                method:'POST',
                body:JSON.stringify({
                    teacherID:param.teacher,
                    courseID:param.courseID,
                    deptID:param.dept
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                dispatch(authActions.setLoading());
                if(data.success){
                    setenrolled(data.students)
                }else{
                    
                }
            })
            .catch(err => {
                dispatch(authActions.setLoading());
                alert('SOMETHING WENT WRONG');
            })
        }
        Call();
    },[])

    const location = useLocation();

    const history = useHistory();

    const data = enrolled.map( item => {
        const url = '/Teacher/'+param.dept+'/'+param.teacher+'/Course/'+param.courseID+'/Enrolled/'+item.studentID;
        return <Link key={item.studentID} to={{
            pathname:url,
            state:{
                studentID:item.studentID
            }
        }}><li className='list-group-item'>STUDENT ID : {item.studentID}</li></Link>
    })

    const x = 'NO STUDENT ENROLLED IN THIS COURSE';

    return (
        loading ? <Spinner/> : <div className={classes.Enrolled}>
        <h1>STUDENTS ENROLLED IN {location.state.courseName}</h1>
        <ul className="list-group" style={{width:"50%",margin:"5% auto"}}>
            {data!==null && data}
            {data===null && x}
        </ul>
    </div>
    )
}

export default Enrolled
