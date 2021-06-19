import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from '../RemoveDepartment/RemoveDepartment.module.css';

function RemoveDepartment() {

    const [id, setid] = useState("");

    const history = useHistory();

    function idHandler(event){
        setid(event.target.value);
    }

    async function formSubmitHandler(event){
        
        event.preventDefault();

        const x = window.confirm('Are You Sure To Delete Department');
        if(x){
            const url = 'http://localhost:4000/Admin/RemoveDepartment'
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
        <div className={classes.RemoveDepartment}>
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
    )
}

export default RemoveDepartment
