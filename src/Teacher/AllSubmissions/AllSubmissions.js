import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import classes from '../AllSubmissions/AllSubmissions.module.css';

function AllSubmissions() {

    const param = useParams();

    const history = useHistory();

    const location = useLocation();

    const { fileUrl,name,maxMarks,submissionDate } = location.state;

    const [Submissions, setSubmissions] = useState([]);

    useEffect( () => {
        async function Call(){
            fetch('http://localhost:4000/Teacher/GetSubmissions',{
                method:'POST',
                body:JSON.stringify({
                    teacherID:param.teacher,
                    assignmentID:param.assignmentID
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
                    setSubmissions(data.data);
                }else{
                    
                }
            })
            .catch( err => {
                alert('SOMETHING WENT WRONG');
            })
        }
        Call();
    },[])

    let data = 'No Submissions';

    if(Submissions.length!==0){
        data = Submissions.map( item => {
            const url = '/Teacher/'+param.dept+'/'+param.teacher+'/Course/'+param.courseID+'/Assignments/'+param.assignmentID+'/Submissions/'+item.studentID;
            return <Link to={{
                pathname:url,
                state:{
                    fileUrl:item.fileUrl,
                    maxMarks:maxMarks,
                    lastSubmissionDate:submissionDate,
                    dateSubmitted:item.submissionDate,
                    givenMarks:item.marks,
                    studentID:item.studentID
                }
            }}><li className="list-group-item">{item.studentID}</li></Link>
        } )
    }

    let viewUrl = '/Teacher/'+param.dept+'/'+param.teacher+'/Course/'+param.CourseID+'/Assignment/'+param.assignmentID+'/View';

    function ViewAssignmentHandler(){
        viewUrl = viewUrl + 'Assignment';
        history.push({
            pathname:viewUrl,
            state:{
                fileUrl,fileUrl
            }
        })
    }

    return (
        <div className={classes.AllSubmissions}>
            <div className='card' style={{margin:'3% auto',width:'50%'}}>
                <div className='card-body'>
                    <h1>{name}</h1>
                    <h1><button className='btn btn-secondary btn-lg' onClick={ViewAssignmentHandler}>View Assignment</button></h1>
                </div>
            </div>
            <h3>Submissions</h3>
            <ul className="list-group" style={{width:"50%",margin:"5% auto"}}>
                {data}
            </ul>
        </div>
    )
}

export default AllSubmissions
