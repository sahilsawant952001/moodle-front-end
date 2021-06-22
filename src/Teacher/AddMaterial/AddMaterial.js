import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import classes from '../AddMaterial/AddMaterial.module.css';
import { storage } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Spinner/Spinner';
import { authActions } from '../../Store/Auth';
 
function AddMaterial() {

    const history = useHistory();

    const param = useParams();

    const [id, setid] = useState("");

    const [name, setname] = useState("");

    const [file, setfile] = useState(null);

    const [fileurl, setfileurl] = useState("");

    const loading = useSelector(state => state.auth.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        if(fileurl!==""){
            const apiurl = 'http://localhost:4000/Teacher/UploadMaterial';
            fetch(apiurl,{
                method:'POST',
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
            })
            .then( res => {
                return res.json();
            }).then( data => {
                dispatch(authActions.setLoading());
                alert(data.message);
                history.goBack();
            }).catch( err =>{
                dispatch(authActions.setLoading());
                alert('SOME ERROR OCCURED');
                history.goBack();
            })
            setfileurl("");
        }
    },[fileurl])

    function idHandler(event){
        setid(event.target.value);
    }

    function nameHandler(event){
        setname(event.target.value);
    }

    function fileHandler(event){
        if(event.target.files[0]){
            setfile(event.target.files[0]);
        }
    }

    async function formSubmitHandler(event){
        event.preventDefault();
        dispatch(authActions.setLoading());
        const uploadTask = storage.ref(`study-material/${file.name}`).put(file);
        uploadTask.on(
        "state_changed",
        snapshot => {
           
        },
        error => {
            dispatch(authActions.setLoading());
        },
        () => {
            storage
            .ref("study-material")
            .child(file.name)
            .getDownloadURL()
            .then(url => {
                setfileurl(url);
            });
            }
        );
    }

    return loading ? <Spinner/> : <div className={classes.AddMaterial}>
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
                <input onChange={fileHandler} type="file" className="form-control" id="exampleFormControlFile1" placeholder="Select File To Upload"/>
            </div>
            <div className="form-group">
                <button className="btn btn-dark btn-block">Create</button>
            </div>      
        </div>
    </form>
</div>
}

export default AddMaterial
