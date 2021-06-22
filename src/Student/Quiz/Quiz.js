import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import classes from '../Quiz/Quiz.module.css';
import Spinner from '../../Spinner/Spinner';
import { authActions } from '../../Store/Auth';

function Quiz() {
    const location = useLocation();

    const param = useParams();

    const history = useHistory();

    const { quizInfo } = location.state; 

    const [myPass, setmyPass] = useState("");

    const loading = useSelector(state => state.auth.loading);

    const dispatch = useDispatch();

    function myPassHandler(event){
        setmyPass(event.target.value);
    }

    const studentID = useSelector(state => state.auth.id);

    function CheckPassword(original,mypass){
        if(original===mypass){
            dispatch(authActions.setLoading());
            const url = '/Student/'+ param.dept +'/'+ param.teacher +'/Course/'+ param.CourseID +'/Quiz/'+quizInfo.quizID;
            fetch('http://localhost:4000/Student/CheckAttempt',{
                method:'POST',
                body:JSON.stringify({
                    studentID:studentID,
                    teacherID:param.teacher,
                    courseID:param.CourseID,
                    deptID:param.dept,
                    quizID:quizInfo.quizID
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                dispatch(authActions.setLoading());
                if(data.success){
                    history.push({
                        pathname:url,
                        state:{
                            quizInfo:quizInfo
                        }
                    })
                }else{
                    alert('YOU HAVE ALREADY GIVEN THIS QUIZ');
                }
            })
            .catch(err => {
                dispatch(authActions.setLoading());
                alert('SOMETHING WENT WRONG');
            })
        }else{
            alert('WRONG QUIZ PASSWORD');
        }
    }

    const rules = <div>
                        <p>1. This Practice Test consists of only MCQ questions. </p>
                        <p>2. There is Negative Marking for wrong answers.</p>
                        <p>3. Do Not switch tabs while taking the test. Switching Tabs will Block / End the test automatically.</p>
                        <p>4. The test will only run in full screen mode. Do not switch back to tab mode. Test will end automatically.</p>
                        <p>5. You may need to use blank sheets for rough work. Please arrange for blank sheets before starting. </p>
                        <p>6. Clicking on Back or Next will save the answer</p>
                        <p>7. Questions can be reattempted till the time test is running.</p>
                        <p>8. Click on the finish test once you are done with the test.</p>
                        <p>9. You will be able to view the scores once your test is complete.</p>
                  </div>

    const quizstart = new Date(quizInfo.quizDate);

    const quizduration = quizInfo.Duration;

    const quizEnd = new Date(quizstart.getTime()+ parseInt(quizduration)*60000);

    const currentDate = new Date();

    return loading ? <Spinner/> : <div className={classes.Quiz}>
            <h1>{quizInfo.quizName} QUIZ</h1>
            {quizstart <= currentDate && currentDate<=quizEnd ? <div className="card" style={{margin:'3% auto 10% auto',width:'55%'}}>
                <div className="card-header">
                    QUIZ INFORMATION
                </div>
                <div className="card-body">
                    <p>NUMBER OF QUESTIONS : {quizInfo.quizQuestions.length}</p>
                    <p>Maximum Marks : {quizInfo.maxMarks}</p>
                    <p>Duration : {quizInfo.Duration}</p>
                    <div style={{textAlign:'left'}}>
                        {rules}
                    </div>
                    <div className="form-group">
                        <input className="form-control" onChange={myPassHandler} type='text' value={myPass} placeholder='Enter Quiz Password To Continue'></input>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">I certify that I have read all the instructions carefully.</label>
                    </div>
                    <div>
                        <button className='btn btn-secondary col-lg-12' onClick={() => {
                            CheckPassword(quizInfo.quizPassword,myPass)}}>Attempt Quiz
                        </button>
                    </div>
                </div>
            </div>:
            <div>
                <div>
                    <p style={{textAlign:'center',margin:'5% auto'}}>QUIZ NOT CURRENTLY AVAILABLE</p>
                    <p>THIS QUIZ WILL BE AVAILABLE BETWEEN</p><br/>
                    <p>Date : {quizstart.toLocaleDateString()} Time : {quizstart.toLocaleTimeString()}</p>
                    <p>To</p>
                    <p>Date : {quizEnd.toLocaleDateString()} Time : {quizEnd.toLocaleTimeString()}</p>
                </div>
            </div>}
        </div>
}

export default Quiz
