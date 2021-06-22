import React from 'react'
import { Link } from 'react-router-dom';
import classes from "../Footer/Footer.module.css";

function Footer() {
    return (
        <div className={classes.footer}>
            <p>Copyright © {new Date().getFullYear()} S.P.I.T. MOODLE All rights reserved.</p>
            <Link to="/">Terms and Conditions</Link><br/>
            <Link to="/">Privacy Policy</Link><br/>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin"></i>
        </div>
    )
}

export default Footer
