import React from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import classes from '../Attempt/Attempt.module.css';

function Attempt() {
    const param = useParams();

    const location = useLocation();

    const { quizInfo,attemptInfo } = location.state;

    return (
        <div className={classes.Attempt}>
            <div className='card' style={{margin:'3% auto',width:'80%'}}>
                <div className='card-body'>
                    <h6>Quiz Name: {quizInfo.quizName}</h6>
                    <h6>Quiz Marks : {quizInfo.maxMarks}</h6>
                    <h6>Quiz Duration : {quizInfo.Duration}</h6>
                </div>
            </div>

            <div className='card' style={{margin:'3% auto',width:'80%'}}>
                <div className='card-body'>
                    <h6>Student ID : {attemptInfo.studentID}</h6>
                    <h6>Score : {attemptInfo.marks}</h6>
                    {attemptInfo.violatedRule && <h6>Exam Rule Violated</h6>}
                </div>
            </div>

            {quizInfo.quizQuestions.map( (item,index) => {
                return <div className='card' style={{margin:'3% auto',width:'80%'}}>
                            <div className='card-body'>
                                <h6>{item.Qquestion}</h6>
                                <p>1. {item.Qoption1}</p>
                                <p>2. {item.Qoption2}</p>
                                <p>3. {item.Qoption3}</p>
                                <p>4. {item.Qoption4}</p>
                                <p>Correct Answer : {quizInfo.correctAns[index]} </p>
                                { attemptInfo.answers[index] ==="-1" ? 'Not Attempted' : <p>Given Answer : {attemptInfo.answers[index]} {attemptInfo.answers[index]===quizInfo.correctAns[index]?<img style={{height:'20px',width:'20px'}} src='https://cdn3.iconfinder.com/data/icons/simple-web-navigation/165/tick-512.png' alt='correct'/>:<img style={{height:'20px',width:'20px'}} src='https://cdn.pixabay.com/photo/2012/04/13/00/22/red-31226_960_720.png' alt='wrong'/>}</p>}
                            </div>
                      </div>
            })}
        </div>
    )
}

export default Attempt
