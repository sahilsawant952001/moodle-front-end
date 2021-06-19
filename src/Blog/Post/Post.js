import React from 'react';
import { useLocation } from 'react-router';
import classes from '../Post/Post.module.css';

function Post() {

    const location = useLocation();
    return (
        
        <div className={classes.Post}>
            <h1>S.P.I.T. Blog</h1>
            <div className="card" style={{width:"50%",margin:"3% auto"}}>
                <div className="card-body">
                    <h1 style={{margin:"4% auto"}}>{location.state.title}</h1>
                    <img src={location.state.image} height='300px' width='300px' alt='post'/>
                    <div className="card" style={{margin:"4% auto"}}>
                        <div className="card-body">
                            <h6>{location.state.content}</h6>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
