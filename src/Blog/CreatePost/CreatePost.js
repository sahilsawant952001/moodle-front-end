import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from '../CreatePost/CreatePost.module.css';
import { storage } from '../../firebase'
import { useHistory } from 'react-router-dom';
import { authActions } from '../../Store/Auth';
import Spinner from '../../Spinner/Spinner';

function CreatePost() {

    const [title, settitle] = useState("");

    const [content, setcontent] = useState("");

    const [file, setfile] = useState(null);

    const auth = useSelector(state => state.auth);

    const [ImgUrl, setImgUrl] = useState("");

    const history = useHistory();

    const loading = useSelector(state => state.auth.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        if(ImgUrl!==""){
                fetch('https://blooming-earth-19953.herokuapp.com/Blog/CreatePost',{
                method:'POST',
                body:JSON.stringify({
                    title:title,
                    content:content,
                    ImgUrl:ImgUrl,
                    authorID:auth.id,
                    authorType:auth.userType
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
                if(data.success){
                    history.goBack();
                }
            })
            .catch(err => {
                dispatch(authActions.setLoading());
                alert('SOMETHING WENT WRONG');
            })
        }

    },[ImgUrl,title,content,auth.id,auth.userType,dispatch,history])

    function contentHandler(event){
        setcontent(event.target.value);
    }

    function titleHandler(event){
        settitle(event.target.value);
    }

    function fileHandler(event){
        if(event.target.files[0]){
            setfile(event.target.files[0]);
        }
    }

    function formSubmitHandler(event){
        event.preventDefault();
        dispatch(authActions.setLoading());
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            snapshot => {
                
            },
            error => {
                dispatch(authActions.setLoading());
                alert('SOMETHING WENT WRONG');
            },
            () => {
                storage
                .ref("images")
                .child(file.name)
                .getDownloadURL()
                .then(url => {
                    setImgUrl(url);
                });
            }
        );
        
    }

    return loading ? <Spinner/> : <div className={classes.CreatePost}>
    <h1>S.P.I.T. BLOG</h1>
    <h4>ADD POST</h4>
    <div className="card" style={{width:"70%",margin:"5% auto",padding:"5%"}}>
       <div className="card-body">
           <form onSubmit={formSubmitHandler}>
               <div className="form-group">
                   <input value={title} onChange={titleHandler} required type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter Title"/>
               </div>
               <div className="form-group">
                   <input value={content} onChange={contentHandler} required type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter Content"/>
               </div>
               <div className="form-group">
                   <input onChange={fileHandler} required type="file" className="form-control" id="formGroupExampleInput2" placeholder="Select Image"/>
               </div>
               <div className="form-group">
                   <button id={classes.submitbtn}  className="btn btn-secondary btn-block">ADD POST</button>
               </div>
           </form>
       </div>
   </div>
</div>
}

export default CreatePost
