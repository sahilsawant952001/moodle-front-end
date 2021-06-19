import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../Store/Auth';
import classes from '../RemoveTeacher/RemoveTeacher.module.css';

function RemoveTeacher() {

    const [id, setid] = useState("");

    function idHandler(event){
        setid(event.target.value);
    }

    const history = useHistory();

    const dispatch = useDispatch();

    async function formSubmitHandler(event){
        event.preventDefault();
        const x = window.confirm('ARE YOU SURE TO DELETE TEACHER');
        dispatch(authActions.setLoading());
        if(x){
            let url = 'http://localhost:4000/Admin/RemoveTeacher';
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
        }else{
            history.goBack();
        }
    }

    return (
        <div className={classes.RemoveTeacher}>
            <h1>Remove Teacher</h1>
            <div className="card" style={{width:"50%",margin:"5% auto",padding:"5%"}}>
                <form onSubmit={formSubmitHandler}>
                    <div className="form-group">
                        <input value={id} onChange={idHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Teacher Email ID to Delete Teacher"/>
                    </div>
                    <div className="form-group">
                        <button id={classes.submitbtn}  className="btn btn-dark btn-block">Remove Teacher</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RemoveTeacher