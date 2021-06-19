import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import classes from '../AddMaterial/AddMaterial.module.css';

function AddMaterial() {

    const history = useHistory();

    const param = useParams();

    const [id, setid] = useState("");

    const [name, setname] = useState("");

    const [fileurl, setfileurl] = useState("");

    function idHandler(event){
        setid(event.target.value);
    }

    function nameHandler(event){
        setname(event.target.value);
    }

    function urlHandler(event){
        setfileurl(event.target.value);
    }

    function formSubmitHandler(event){
        event.preventDefault();
        const x = window.confirm('ARE YOU SURE TO UPLOAD NEW FILE');
        if(x){
            const url = 'http://localhost:4000/Teacher/UploadMaterial';

            fetch(url,{
                method:'POST',
                mode:'cors',
                body:JSON.stringify({
                    _id:id,
                    name:name,
                    teacherID:param.teacher,
                    courseID:param.courseID,
                    url:fileurl
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            }).then( res => {
                return res.json();
            }).then( data => {
                alert(data.message);
                history.goBack();
            }).catch( err =>{
                alert('SOME ERROR OCCURED');
                history.goBack();
            })
        }else{
            history.goBack();
        }
    }

    return (
        <div className={classes.AddMaterial}>
            <h1>Add Material</h1>
            <form onSubmit={formSubmitHandler}>
                <div className="card" style={{width:"70%",margin:"5% auto",padding:"5%"}}>
                    <div className="form-group">
                        <input value={id} onChange={idHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Unique ID For Material"/>
                    </div>
                    <div className="form-group">
                        <input value={name} onChange={nameHandler} required type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter Name For Material"/>
                    </div>
                    <div className="form-group">
                        <input value={fileurl} onChange={urlHandler} type="text" className="form-control" id="exampleFormControlFile1" placeholder="Enter File Url"/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-dark btn-block">Create</button>
                    </div>      
                </div>
            </form>
        </div>
    )
}

export default AddMaterial
