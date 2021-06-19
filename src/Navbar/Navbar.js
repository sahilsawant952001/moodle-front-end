import classes from '../Navbar/Navbar.module.css';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from "@material-ui/core/IconButton"
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../Store/Auth';

function Navbar() {

    const userType = useSelector(state => state.auth.userType);

    let userDept = useSelector(state => state.auth.dept);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const quiz = useSelector(state => state.auth.quiz);

    const userID = useSelector(state => state.auth.id);

    const urlProfile = '/'+userType+'/Profile';

    const history = useHistory();

    const urlBlog = '/Blog';

    if(userType==='Admin'){
        userDept='Home'
    }

    const dispatch = useDispatch();

    function logOutHandler(){
        dispatch(authActions.logout());
        history.replace('/');
    }

    let urlHome = '/';

    if(userType==='Student'){
        urlHome = '/'+userType+'/'+userDept;
    }else if(userType==='Teacher'){
        urlHome = '/'+userType+'/'+ userDept+'/'+userID;
    }else if(userType==='Admin'){
        urlHome = '/Admin/Home';
    }
    



    return (
        <div>
            <div className={classes.Navbar1}>
                <nav className="navbar navbar-light bg-light">
                    {!quiz ? <Link className="navbar-brand" to={urlHome}>
                        <img src="https://media-exp1.licdn.com/dms/image/C510BAQHE1bLMZIcIxw/company-logo_200_200/0/1552644853195?e=2159024400&v=beta&t=gSN4Rm30wZuctbeBBqiEZ761CbzGXXb7NjVeg7ZrDuQ" width="40px" height="40px" className="d-inline-block align-top" alt="icon"/>
                        <span style={{color:'black'}}>Sardar Patel Institute Of Technology</span>
                    </Link>:<div>
                        <img src="https://media-exp1.licdn.com/dms/image/C510BAQHE1bLMZIcIxw/company-logo_200_200/0/1552644853195?e=2159024400&v=beta&t=gSN4Rm30wZuctbeBBqiEZ761CbzGXXb7NjVeg7ZrDuQ" width="40px" height="40px" className="d-inline-block align-top" alt="icon"/>
                        <span>Sardar Patel Institute Of Technology</span>
                    </div>}
                    {(isAuthenticated && !quiz) && <span>
                        <span>
                            <Link to={urlBlog}>
                                <IconButton>
                                    <ForumIcon/>
                                </IconButton>
                            </Link>
                        </span>
                        <span>
                            <Link to={urlHome}>
                                <IconButton>
                                    <HomeIcon/>
                                </IconButton>
                            </Link>
                        </span>
                        <span>
                            <Link to={urlProfile}>
                                <IconButton>
                                    <AccountCircleIcon/>
                                </IconButton>
                            </Link>
                        </span>
                        <span onClick={ logOutHandler }>
                            <IconButton>
                                <ExitToAppIcon/>
                            </IconButton>                
                        </span>
                    </span>}
                </nav>
            </div>
        </div>
    )
}

export default Navbar
