import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from '../AddDepartment/AddDepartment.module.css';

function AddDepartment() {

    const [id, setid] = useState("");

    function idHandler(event){
        setid(event.target.value);
    }

    const history = useHistory();

    const [name, setname] = useState("");

    function nameHandler(event){
        setname(event.target.value);
    }

    async function formSubmitHandler(event){
        event.preventDefault();
        const x = window.confirm('ARE SURE TO ADD NEW DEPARTMENT');
        if(x){
            const url = 'http://localhost:4000/Admin/AddDepartment'
            fetch(url,{
                method:'POST',
                mode:'cors',
                body:JSON.stringify({
                    id:id,
                    name:name
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
                    alert(data.message);
                }else{
                    alert(data.message);
                }
                history.goBack();
            })
        }else{
            history.goBack();
        }
    }

    return (
        <div className={classes.AddDepartment}>
            <h1>Add Department</h1>
            <div className="card" style={{width:"50%",margin:"5% auto",padding:"5%"}}>
                <form onSubmit={formSubmitHandler}>
                    <div className="form-group">
                        <input value={id} onChange={idHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Unique ID for Department"/>
                    </div>
                    <div className="form-group">
                        <input value={name} onChange={nameHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Department Name"/>
                    </div>
                    <div className="form-group">
                        <button id={classes.submitbtn}  className="btn btn-dark btn-block">Add Department</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddDepartment
