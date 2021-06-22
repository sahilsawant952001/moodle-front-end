import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from '../../Store/Auth';
import classes from '../Posts/Posts.module.css';
import Spinner from '../../Spinner/Spinner';

function Posts() {
    const [posts, setposts] = useState([]);

    const loading = useSelector(state => state.auth.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.setLoading());
        fetch('https://blooming-earth-19953.herokuapp.com/Blog/GetPosts')
        .then(res => res.json())
        .then(data => {
            dispatch(authActions.setLoading());
            if(data.success){
                setposts(data.posts);
            }else{
                
            }
        })
        .catch(err => {
            dispatch(authActions.setLoading());
            alert('SOMETHING WENT WRONG')
        })
    },[dispatch])

    let data = null;
    
    if(posts.length!==0){
        data = posts.map( post => {
            const url = '/Blog/Posts/'+post._id;
            return  <div key={post._id} className="card" style={{width:"20rem",margin:"3%",padding:"3%",display:'inline-block'}}>
                        <h4 style={{margin:'10% auto'}} className='car-header'>{post.title}</h4>
                        <img className="card-img-top" height='200px' width='200px' src={post.ImgUrl || 'https://www.wpbeginner.com/wp-content/uploads/2016/11/blogimagetools.jpg'} alt="blog-img"/>
                        <div className="card-body">
                            <p className="card-text">{post.content.slice(0,50)}</p>
                        </div>
                        <Link to={{
                            pathname:url,
                            state:{
                                title:post.title,
                                content:post.content,
                                authorID:post.authorID,
                                authorType:post.authorType,
                                image:post.ImgUrl || 'https://www.wpbeginner.com/wp-content/uploads/2016/11/blogimagetools.jpg'
                            }
                        }} className='btn btn-dark'>Read More</Link>
                    </div>
        })
    }

    return loading ? <Spinner/> : <div className={classes.Posts}>
    <h1>S.P.I.T. Blog</h1>
    <h4>ADD POST</h4>
    <Link to='/Blog/CreatePost'  className='btn btn-secondary btn-lg col-lg-4' style={{display:'block',margin:'4% auto'}}>CREATE POST</Link>
    <Link to={{
        pathname:'/Blog/MyPosts',
        state:{
            posts:posts
        }
    }}  className='btn btn-secondary btn-lg col-lg-4' style={{display:'block',margin:'4% auto'}}>MY POSTS</Link>
    {data}
</div>
}

export default Posts
