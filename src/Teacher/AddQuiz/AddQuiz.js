import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import classes from '../AddQuiz/AddQuiz.module.css';
import Spinner from '../../Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store/Auth';


function AddQuiz() {

    const param = useParams();

    const history = useHistory();

    const [id, setid] = useState("");

    const [name, setname] = useState("");

    const [question, setquestion] = useState("");

    const [option1, setoption1] = useState("");

    const [option2, setoption2] = useState("");

    const [option3, setoption3] = useState("");

    const [option4, setoption4] = useState("");

    const [count, setcount] = useState(0);

    const [questionArray, setquestionArray] = useState([]);

    const [quizPassword, setquizPassword] = useState("");

    const [quizDate, setquizDate] = useState("");

    const [quizDuration, setquizDuration] = useState("");

    const [quizMarks, setquizMarks] = useState(0);

    const [correctOption, setcorrectOption] = useState("");

    const [correctAns, setcorrectAns] = useState([]);

    const [questionMark, setquestionMark] = useState("");

    const [marksArray, setmarksArray] = useState([]);

    const loading = useSelector(state => state.auth.loading);

    const dispatch = useDispatch();

    function quizDateHandler(event){
        setquizDate(event.target.value);
    }

    function quizDurationHandler(event){
        setquizDuration(event.target.value);
    }

    function quizPasswordHandler(event){
        setquizPassword(event.target.value);
    }

    function idHandler(event){
        setid(event.target.value);
    }

    function nameHandler(event){
        setname(event.target.value);
    }

    function questionHandler(event){
        setquestion(event.target.value);
    }

    function option1Handler(event){
        setoption1(event.target.value);
    }

    function option2Handler(event){
        setoption2(event.target.value);
    }

    function option3Handler(event){
        setoption3(event.target.value);
    }

    function option4Handler(event){
        setoption4(event.target.value);
    }

    function correctOptionHandler(event){
        setcorrectOption(event.target.value);
    }

    function questionMarkHandler(event){
        setquestionMark(event.target.value)
    }

    function formSubmitHandler(event){
        event.preventDefault();
        dispatch(authActions.setLoading());
        fetch('https://blooming-earth-19953.herokuapp.com/Teacher/AddQuiz',{
            method:'POST',
            body:JSON.stringify({
                quizID:id,
                quizName:name,
                quizPassword:quizPassword,
                courseID:param.courseID,
                teacherID:param.teacher,
                deptID:param.dept,
                quizDate:new Date(quizDate),
                Duration:quizDuration,
                maxMarks:quizMarks,
                quizQuestions:questionArray,
                quizAns:correctAns,
                quizAnsMarks:marksArray
            }),
            headers:{
                'Content-Type':'application/json'
            }

        })
        .then(res => {
            return res.json();
        })
        .then(data =>{
            dispatch(authActions.setLoading());
            if(data.success){
                alert(data.message);
                history.goBack();
            }else{
                alert(data.message);
            }
        })
        .catch(err =>{
            dispatch(authActions.setLoading());
            alert('SOMETHING WENT WRONG');
        })
    }

    function addQuestion(event){
        event.preventDefault();
        const quizQuestion = {
            id:count,
            Qquestion:question,
            Qoption1:option1,
            Qoption2:option2,
            Qoption3:option3,
            Qoption4:option4
        };
        setquestionArray([...questionArray,quizQuestion]);
        setcorrectAns([...correctAns,correctOption]);
        setmarksArray([...marksArray,questionMark]);
        setquizMarks(quizMarks + parseInt(questionMark));
        setquestionMark("");
        setcorrectOption("");
        setquestion("");
        setoption1("");
        setoption2("");
        setoption3("");
        setoption4("");
        setcount(count+1);
    }

    return (
        loading ? <Spinner/> : <div className={classes.AddQuiz}>
        <h1>Add Quiz</h1>
        <div className="row">
            <div className="col-lg-6">
                <form onSubmit={formSubmitHandler}>
                    <div className="card" style={{width:"70%",margin:"5% auto",padding:"5%"}}>
                        <h3>Quiz Information</h3>
                        <div className="form-group">
                            <input value={id} onChange={idHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Unique Quiz ID"/>
                        </div>
                        <div className="form-group">
                            <input value={name} onChange={nameHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Quiz Name"/>
                        </div>
                        <div className="form-group">
                            <input value={quizPassword} onChange={quizPasswordHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Quiz Password"/>
                        </div>
                        <div className="form-group">
                            <input value={quizDate} onChange={quizDateHandler} required type="datetime-local" className="form-control" id="formGroupExampleInput3" placeholder="Enter Quiz Date"/>
                        </div>
                        <div className="form-group">
                            <input value={quizDuration} onChange={quizDurationHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Quiz Duration"/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-dark btn-block">Create Quiz</button>
                        </div>      
                    </div>
                </form>
            </div>
            <div className="col-lg-6">
                <div className="card" style={{width:"70%",margin:"5% auto",padding:"5%"}}>
                    <h3>Add Question</h3>
                    <form onSubmit={addQuestion}>
                        <div className="form-group">
                            <input value={question} onChange={questionHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Question"/>
                        </div>
                        <div className="form-group">
                            <input value={option1} onChange={option1Handler} required type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter Option 1"/>
                        </div>
                        <div className="form-group">
                            <input value={option2} onChange={option2Handler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Option 2"/>
                        </div>
                        <div className="form-group">
                            <input value={option3} onChange={option3Handler} required type="text" className="form-control" id="formGroupExampleInput4" placeholder="Enter Option 3"/>
                        </div>
                        <div className="form-group">
                            <input value={option4} onChange={option4Handler} required type="text" className="form-control" id="formGroupExampleInput5" placeholder="Enter Option 4"/>
                        </div>
                        <div className="form-group">
                            <input value={correctOption} onChange={correctOptionHandler} required type="text" className="form-control" id="formGroupExampleInput5" placeholder="Enter Correct Option Number"/>
                        </div>
                        <div className="form-group">
                            <input value={questionMark} onChange={questionMarkHandler} required type="text" className="form-control" id="formGroupExampleInput5" placeholder="Enter Marks For This Question"/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-dark btn-block">Add Question</button>
                        </div>   
                    </form>
                </div>
            </div>
        </div>
        <h3>Quiz Preview</h3>
        <div className="card" style={{width:"70%",margin:"5% auto",padding:"5%"}}>
            {questionArray.map( x => {
                return  <div key={x.Qquestion} className="card" style={{width:"70%",margin:"5% auto",padding:"5%"}}>
                            <h4>Question : {x.Qquestion}</h4>
                            <h6>Option1 : {x.Qoption1}</h6>
                            <h6>Option2 : {x.Qoption2}</h6>
                            <h6>Option3 : {x.Qoption3}</h6>
                            <h6>Option4 : {x.Qoption4}</h6>
                        </div>
            })}
        </div>
    </div>
    )
}

export default AddQuiz
