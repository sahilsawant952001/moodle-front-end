import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../Posts/Posts.module.css';

function Posts() {
    const post = [
        {
            id:'1',
            title:'Post 1',
            content:'I am delighted to share that I will be joining American Express as an SDE intern, starting next week.Excited to get started and thanks to Surya Sharma for the smooth recruitment process.Also, thanks to Komal maam for encouraging me to apply for this.',
            image:'https://media-exp3.licdn.com/dms/image/C4D22AQHUEmCVMrNhoQ/feedshare-shrink_800/0/1622204969704?e=1626307200&v=beta&t=hQEjB9SguXEe1IovP3uTz0WspBOBlZx1_FoxtXsr35Y'
        },
        {
            id:'2',
            title:'Post 2',
            content:'I am extremely happy to announce that I have joined Uber as Software Engineer 2.Huge thanks to my recruiters Prashant sagar and Vipin V for helping me throughout the process and smooth virtual onboarding.Special thanks to Media.net for the lessons and skills I learnt over the last 4 years.Really excited and looking forward to this new journey!!!',
            image:'https://media-exp3.licdn.com/dms/image/C4E22AQEKBSx1uwdjlA/feedshare-shrink_1280/0/1622272392846?e=1626307200&v=beta&t=1Q3rI9ZmPDSOik9hQkm2W99iNucqEtJlmOIU74ka8Sw'
        },
        {
            id:'3',
            title:'Post 3',
            content:'Finally got my share of Ferrero Rocher and letter of gratitude. Would like to Thank Sanjay Jalona Sir and the entire LTI - Larsen & Toubro Infotech team , who thought of this wonderful gesture to keep our spirits high and bring a smile on our face amid this pandemic. It feels great to be a part of the LTI - Larsen & Toubro Infotech family.',
            image:'https://media-exp3.licdn.com/dms/image/C5622AQHFk3dmGn1OZQ/feedshare-shrink_800/0/1623314208262?e=1626307200&v=beta&t=cFAYOGcMakLBSDzAYJz55tLa7iZLiwJKj0qTcaXn5gw'
        }
    ]

    const data = post.map( post => {
        const url = '/Blog/'+post.id;
        return <div className="card" style={{width:"30rem",margin:"2% auto",padding:"3%"}}>
            <h4 className='car-header'>{post.title}</h4>
            <img className="card-img-top" height='300px' width='300px' src={post.image || 'https://www.wpbeginner.com/wp-content/uploads/2016/11/blogimagetools.jpg'} alt="blog-img"/>
            <div className="card-body">
                <p className="card-text">{post.content.slice(0,50)}</p>
            </div>
            <Link to={{
                pathname:url,
                state:{
                    title:post.title,
                    content:post.content,
                    image:post.image || 'https://www.wpbeginner.com/wp-content/uploads/2016/11/blogimagetools.jpg'
                }
            }} className='btn btn-dark'>Read More</Link>
        </div>
    })

    return (
        <div className={classes.Posts}>
            <h1>S.P.I.T. Blog</h1>
            {data}
        </div>
    )
}

export default Posts
