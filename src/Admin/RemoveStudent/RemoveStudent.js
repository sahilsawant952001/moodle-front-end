import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../Store/Auth';
import classes from '../RemoveStudent/RemoveStudent.module.css';
import Spinner from '../../Spinner/Spinner';

function RemoveStudent() {

    const [id, setid] = useState("");

    function idHandler(event){
        setid(event.target.value);
    }

    const dispatch = useDispatch();

    const history = useHistory();

    const loading = useSelector(state => state.auth.loading);

    async function formSubmitHandler(event){
        event.preventDefault();
        dispatch(authActions.setLoading());
        let url = 'http://localhost:4000/Admin/RemoveStudent';
        let body = {
            email:id,
        }
        fetch(url,{
            method:'POST',
            mode:'cors',
            body:JSON.stringify(body),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then( res => {
            return res.json();
        }).then( data => {
            dispatch(authActions.setLoading());
            if(data.success){
                alert(data.message);
                history.goBack();
            }else{
                alert(data.message);
                history.goBack();
            }
        }).catch((err) => {
                dispatch(authActions.setLoading());
                alert('FAILED TO DELETE TEACHER');
        });
    }

    return loading ? <Spinner/> : <div className={classes.RemoveStudent}>
    <h1>Remove Student</h1>
    <div className="card" style={{width:"50%",margin:"5% auto",padding:"5%"}}>
        <form onSubmit={formSubmitHandler}>
            <div className="form-group">
                <input value={id} onChange={idHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Student ID to Delete Student"/>
            </div>
            <div className="form-group">
                <button id={classes.submitbtn}  className="btn btn-dark btn-block">Remove Student</button>
            </div>
        </form>
    </div>
</div>
}

export default RemoveStudent
