import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import classes from '../AllCourses/AllCourses.module.css';


function AllCourses() {
    const param = useParams();

    const teachername = useSelector(state => state.auth.name);
    const teachersurname = useSelector(state => state.auth.surname);
    const teacherID = useSelector(state => state.auth.id);
    
    const history = useHistory();

    const [allCourses, setallCourses] = useState([]);

    useEffect(() => {
        async function Call(){
            fetch('http://localhost:4000/AllCourses',{
                method:'POST',
                body:JSON.stringify({
                    teacherID:teacherID
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then( res => {
                return res.json();
            })
            .then( data => {
                if(data.success){
                    setallCourses(data.courses);
                }else{
                    alert(data.message);
                    history.goBack();
                }
            })
            .catch( err =>{
                alert('SOME ERROR OCCURED');
                history.goBack();
            })
        }

        Call();
    },[])

    const url1 = '/Teacher/'+param.dept+'/'+param.teacher+'/CreateCourse';

    let cdata = null;

    if(allCourses.length!==0){
        cdata = allCourses.map( course => {
            const url = '/Teacher/'+param.dept+'/'+param.teacher+'/Course/'+course._id;
            return <Link to={{
                pathname:url,
                state:{
                    courseInfo:course
                }
            }}><li className="list-group-item">{course.courseName}</li></Link>
        });
    }

    return (
        <div className={classes.AllCourses}>
            <h1>Courses By Prof. {teachername+" "+teachersurname} </h1>
            <ul className="list-group" style={{width:"50%",margin:"5% auto"}}>
                {cdata}
                <Link to={url1} style={{margin:"2% 0"}} className='btn btn-dark'>Create Course</Link>
            </ul>
        </div>
    )
}

export default AllCourses
