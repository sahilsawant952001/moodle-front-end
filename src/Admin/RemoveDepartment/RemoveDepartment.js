import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../Store/Auth';
import classes from '../RemoveDepartment/RemoveDepartment.module.css';
import Spinner from '../../Spinner/Spinner';

function RemoveDepartment() {

    const [id, setid] = useState("");

    const history = useHistory();

    const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.loading);

    function idHandler(event){
        setid(event.target.value);
    }

    async function formSubmitHandler(event){
        
        event.preventDefault();
        dispatch(authActions.setLoading());
        const url = 'https://blooming-earth-19953.herokuapp.com/Admin/RemoveDepartment'
        fetch(url,{
            method:'POST',
            mode:'cors',
            body:JSON.stringify({
                id:id,
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then( res => {
            return res.json();
        })
        .then( data => {
            dispatch(authActions.setLoading());
            if(data.success){
                alert(data.message);
            }else{
                alert(data.message);
            }
            history.goBack();
        })
        .catch(err => {
            dispatch(authActions.setLoading());
            alert('SOMETHING WENT WRONG');
        })
    }

    return loading ? <Spinner/> : <div className={classes.RemoveDepartment}>
    <h1>Remove Department</h1>
    <div className="card" style={{width:"50%",margin:"5% auto",padding:"5%"}}>
        <form onSubmit={formSubmitHandler}>
            <div className="form-group">
                <input value={id} onChange={idHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Department ID to Delete Department"/>
            </div>
            <div className="form-group">
                <button id={classes.submitbtn}  className="btn btn-dark btn-block">Remove Department</button>
            </div>
        </form>
    </div>
</div>
        
    
}

export default RemoveDepartment
