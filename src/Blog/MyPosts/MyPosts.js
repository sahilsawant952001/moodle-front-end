import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Spinner from '../../Spinner/Spinner';
import { authActions } from '../../Store/Auth';
import classes from '../MyPosts/MyPosts.module.css';

function MyPosts() {

    const location = useLocation();

    const { posts } = location.state;

    const history = useHistory();

    const userID = useSelector(state => state.auth.id);

    let data = null;

    const loading = useSelector(state => state.auth.loading);

    const dispatch = useDispatch();
   
    async function postDeleteHandler(postID){
        dispatch(authActions.setLoading());
        fetch('https://blooming-earth-19953.herokuapp.com/Blog/DeletePost',{
            method:'POST',
            body:JSON.stringify({
                postID:postID
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(authActions.setLoading());
            if(data.success){
                alert(data.message);
            }else{
                alert(data.message);
            }
            history.goBack();
        })
        .catch(err =>  {
            dispatch(authActions.setLoading());
            alert('SOMETHING WENT WRONG')
        })
    }

    if(posts!==null){
        data = posts.map(post => {
            if(post.authorID===userID){
        
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
                                }} className='btn btn-dark col-12'>Read More</Link>
                            <br/><br/>
                            <button onClick={() => postDeleteHandler(post._id)} className='btn btn-outline-danger col-12'>DELETE</button>
                        </div>
            }
            return null;
        })
    }

    return (
        loading ? <Spinner/> : <div className={classes.MyPosts}>
            <h1>MY POSTS</h1>
            {data}
    </div>
    )
}

export default MyPosts
