import classes from '../QuizStart/QuizStart.module.css';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import { authActions } from '../../Store/Auth';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Spinner/Spinner';

function MyTimer(props) {
    
    const expiryTimestamp = props.expiryTimestamp;

    const {
      seconds,
      minutes,
      hours,
      days
    } = useTimer({ expiryTimestamp, onExpire: () => props.finishHandler() });
  
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Time Remaining </h1>
        <div style={{fontSize: '50px'}}>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
      </div>
    );
  }

function QuizStart() {

    const location = useLocation();

    const { quizInfo } = location.state;

    const [QIndex, setQIndex] = useState(0);

    let AnsArray = new Array(quizInfo.quizQuestions.length+1).fill('-1');

    const [Answers, setAnswers] = useState(AnsArray);

    let newArray2 = new Array(quizInfo.quizQuestions.length+1).fill({});

    const [btnStyles, setbtnStyles] = useState(newArray2);

    const [forcedExit, setforcedExit] = useState(false);

    const [normalExit, setnormalExit] = useState(false);

    const [count, setcount] = useState(0);

    const dispatch = useDispatch();

    const [inFullScreen, setinFullScreen] = useState(false);

    const loading = useSelector(state => state.auth.loading);

    const param = useParams();

    const studentID = useSelector(state => state.auth.id);

    const style1 = {
        
    }

    const style2 = {
        backgroundColor:'green',
        color:'white'
    }

    useEffect(() => {  
        dispatch(authActions.setQuiz());
        setinFullScreen(true);
        openFullscreen();
    },[dispatch])

    useEffect(() => {
        if(count===1 && forcedExit===true && !normalExit){
            let answers = Answers;
            answers.pop();
            
            setinFullScreen(false);
            dispatch(authActions.setLoading());
            fetch('https://blooming-earth-19953.herokuapp.com/Student/Attempt',{
                method:'POST',
                body:JSON.stringify({
                    studentID:studentID,
                    teacherID:param.teacher,
                    courseID:param.CourseID,
                    deptID:param.dept,
                    quizID:param.quizID,
                    answers:answers,
                    marks:"NG",
                    violatedRule:true,
                    maxMarks:quizInfo.maxMarks
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
                alert(data.message);
            })
            .catch(err => {
                dispatch(authActions.setLoading());
                alert('SOMETHING WENT WRONG');
            })
        }

    },[quizInfo.maxMarks,count,Answers,dispatch,forcedExit,normalExit,studentID,param.CourseID,param.dept,param.quizID,param.teacher])


    function Finish(){
        setnormalExit(true);
        closeFullscreen();
        setinFullScreen(false);
        let answers = Answers;
        answers.pop();
        dispatch(authActions.setLoading());
        fetch('https://blooming-earth-19953.herokuapp.com/Student/Attempt',{
            method:'POST',
            body:JSON.stringify({
                studentID:studentID,
                teacherID:param.teacher,
                courseID:param.CourseID,
                deptID:param.dept,
                quizID:param.quizID,
                answers:answers,
                marks:"NG",
                violatedRule:false,
                maxMarks:quizInfo.maxMarks
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
            alert(data.message);
        })
        .catch(err => {
            dispatch(authActions.setLoading());
            alert('SOMETHING WENT WRONG');
        })
    }

    var elem = document.documentElement;

    function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }



    document.addEventListener('fullscreenchange', exitHandler);
 
    function exitHandler() {
        if (!document.fullscreenElement && forcedExit===false) {
            setforcedExit(true);
            setcount(count+1);
        }
    } 

    useEffect(() => {
        if(Answers[QIndex]==='-1'){
            
            var ele = document.getElementsByName("QuizQuestion");
            for(var i=0;i<ele.length;i++)
                ele[i].checked = false;
        }else{
            
            ele = document.getElementsByName("QuizQuestion");
            for(i=0;i<ele.length;i++)
            {
                if(QIndex===i){
                    ele[i].checked = true;
                }else{
                    ele[i].checked = false;
                }
            }
        }
    },[QIndex,Answers])

    function nextQuestion(){
        if(QIndex<Answers.length-1){
            setQIndex(QIndex+1);
        }
    }

    function prevQuestion(){
        if(QIndex>0){
            setQIndex(QIndex-1);
        }
    }

    let quizData = null;

    function clearAns(){
        let darr = Answers;
        darr[QIndex] = "-1";
        setAnswers(darr);
        let newstyle = btnStyles;
        newstyle[QIndex] = style1;
        setbtnStyles(newstyle);
        var ele = document.getElementsByName("QuizQuestion");
        for(var i=0;i<ele.length;i++)
            ele[i].checked = false;
    }

    function UpdateAns(event){
        let darr = Answers;
        darr[QIndex] = event.target.value;
        setAnswers(darr);
        let newstyle = btnStyles;
        newstyle[QIndex] = style2;
        setbtnStyles(newstyle);
    }

    let btns = Answers.map((val,index) => <button key={index} style={btnStyles[index]} onClick={() => setQIndex(index)}>{index===Answers.length-1 ? 'END':index+1}</button>)

    const summary = <div className={classes.summary}>
                        <p>Are You Sure To End The Test ?</p>
                        <button className='btn btn-secondary btn-lg' onClick={Finish}>FINISH</button>
                    </div>

    if(quizInfo.quizQuestions.length!==0){
        quizData = <div className='card' style={{margin:'3% auto',width:'70%'}}>
                        <p style={{margin:'3% 0 0 0'}}>This Question Is For {quizInfo.marksArr[QIndex]} Marks</p>
                        <div className='card-body'>
                            {QIndex<= quizInfo.quizQuestions.length -1  ? <div><div className='card' style={{margin:'3% auto',width:'100%'}}>
                                <div className='card-body'>
                                    <div style={{float:'left',width:'100%'}}><h6 style={{float:'left'}}>{quizInfo.quizQuestions[QIndex].Qquestion}</h6></div>
                                    <div style={{float:'left',width:'100%'}}>
                                        <div style={{float:'left'}} className="form-check">
                                            <input className="form-check-input" type="radio" name="QuizQuestion" id="1" value="1" onClick={UpdateAns}/>
                                            <label className="form-check-label" for="QuizQuestion1">
                                                {quizInfo.quizQuestions[QIndex].Qoption1}
                                            </label>
                                        </div>
                                    </div>
                                    <div style={{float:'left',width:'100%'}}>
                                        <div style={{float:'left'}} className="form-check">
                                            <input className="form-check-input" type="radio" name="QuizQuestion" id="2" value="2" onClick={UpdateAns}/>
                                            <label className="form-check-label" for="QuizQuestion2">
                                                {quizInfo.quizQuestions[QIndex].Qoption2}
                                            </label>
                                        </div>
                                    </div>
                                    <div style={{float:'left',width:'100%'}}>
                                        <div style={{float:'left'}} className="form-check">
                                            <input className="form-check-input" type="radio" name="QuizQuestion" id="3" value="3" onClick={UpdateAns}/>
                                            <label className="form-check-label" for="QuizQuestion3">
                                                {quizInfo.quizQuestions[QIndex].Qoption3}
                                            </label>
                                        </div>
                                    </div>
                                    <div style={{float:'left',width:'100%'}}>
                                        <div style={{float:'left'}} className="form-check">
                                            <input className="form-check-input" type="radio" name="QuizQuestion" id="4" value="4" onClick={UpdateAns}/>
                                            <label className="form-check-label" for="QuizQuestion4">
                                                {quizInfo.quizQuestions[QIndex].Qoption4}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <button onClick={clearAns} className='btn btn-outline-primary col-lg-12' style={{margin:'2% 0'}}>Clear</button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <button onClick={prevQuestion} className='btn btn-outline-secondary col-lg-12' style={{margin:'2% 0'}}>Previous</button>
                                </div>
                                <div className='col-lg-6'>
                                    <button onClick={nextQuestion} className='btn btn-outline-secondary col-lg-12' style={{margin:'2% 0'}}>Next</button>
                                </div>
                            </div></div>:summary}
                        </div>
                     </div>
    }

    const time = new Date();

    time.setSeconds(time.getSeconds() + parseInt(quizInfo.Duration)*60);

    const history = useHistory();

    function goBackHandler(){
        history.goBack();
        dispatch(authActions.setQuiz());
    }
    
    return loading ? <Spinner/> : <div className={classes.QuizStart}>
    {!forcedExit && !normalExit && <div><div>
        <MyTimer expiryTimestamp={time} val={true} finishHandler={Finish} />
    </div>
    <div className={classes.btns}>
        {btns}
    </div>
    <div id="myvideo" style={{backgroundColor:"white"}}>
        {quizData}
    </div></div>}
    {forcedExit && !normalExit && <h1>You Violated Exam Rule</h1>}
    {normalExit && <h1>Congratulations You Successfully Completed Test</h1>}
    {!inFullScreen && <button className='btn btn-secondary btn-lg' onClick={goBackHandler}>GO BACK</button>}
</div>
}

export default QuizStart
