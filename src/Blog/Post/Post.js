import React from 'react';
import { useLocation } from 'react-router';
import classes from '../Post/Post.module.css';

function Post() {

    const location = useLocation();
    return  <div className={classes.Post}>
            <h1>S.P.I.T. Blog</h1>
            <div className="card" style={{width:"90%",margin:"1% auto"}}>
                <div className="card-body">
                    <h3 className='card-title' style={{margin:"4% auto"}}>{location.state.title}</h3>
                    <img src={location.state.image} height='50%' width='50%' alt='post'/>
                    <h6 style={{margin:'5% 2%'}}>{location.state.content}</h6>  
                    <p className="card-text"><small className="text-muted">{location.state.authorType} : {location.state.authorID}</small></p>
                </div>
            </div>
        </div>
    
}

export default Post
