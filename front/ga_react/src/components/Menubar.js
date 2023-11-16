import React from "react";
import "./menubar.css";

import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="nav-bar">
            <Link className='text-Home' to='/home'>Home</Link>
            <Link className="text-History" to='/history'>History</Link>
            <Link className='text-Tips' to='/tips'>Tips</Link>
            <div className="rectangle" />
            <div className="logo">
                <div className='background'>
                    <div className='text'>
                        Green
                        <br />
                        Algorithm
                    </div>
                </div>
            </div>
        </div>
    );
};


export default NavBar
