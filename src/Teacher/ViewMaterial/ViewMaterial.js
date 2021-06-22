import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { storage } from '../../firebase';
import { authActions } from '../../Store/Auth';
import Spinner from '../../Spinner/Spinner';
import classes from '../ViewMaterial/ViewMaterial.module.css';

function ViewAssignmentT() {
    const location = useLocation();

    const dispatch = useDispatch();

    const history = useHistory();

    const loading = useSelector(state => state.auth.loading);

    const param = useParams();

    function deleteHandler(event){
        event.preventDefault();
        dispatch(authActions.setLoading());
        const uploadTask = storage.refFromURL(location.state.fileurl);
        uploadTask.delete()
        .then(() => {
            fetch('http://localhost:4000/Teacher/Delete/Material',{
                method:'POST',
                body:JSON.stringify({
                    name:location.state.filename,
                    teacherID:param.teacher,
                    url:location.state.fileurl,
                    courseID:param.courseID
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
                    history.goBack();
                }else{
                    alert(data.message);
                    history.goBack();
                }
            })
            .catch( err =>{
                dispatch(authActions.setLoading());
                alert('SOMETHING WENT WRONG');
                history.goBack();
            })
        })
        .catch(err => {
            dispatch(authActions.setLoading());
            alert('SOMETHING WENT WRONG');
        })
    }

    return (
        loading ? <Spinner/> : <div className={classes.ViewMaterial}>
        <h1>{location.state.filename}</h1>
        <button style={{margin:'2% auto'}} className='btn btn-secondary' onClick={deleteHandler}>DELETE</button>
        <embed src={location.state.fileurl} width="800px" height="700px" style={{margin:"3%"}} />
    </div>
    )
}

export default ViewAssignmentT
