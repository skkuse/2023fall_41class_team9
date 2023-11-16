import React from "react";
import PropTypes from "prop-types";
import "./menubar.css";

import { Link } from "react-router-dom";

const MenuBar = ({page}) => {
    console.log(page)
    return (
        <div className="nav-bar">
            {page === "home" ? <Link className='text-Home-underline' to='/home'>Home</Link> : <Link className='text-Home' to='/home'>Home</Link>}
            {page === "history" ? <Link className="text-History-underline" to='/history'>History</Link> : <Link className="text-History" to='/history'>History</Link>}
            {page === "tips" ? <Link className='text-Tips-underline' to='/tips'>Tips</Link> : <Link className='text-Tips' to='/tips'>Tips</Link>}
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

MenuBar.propTypes = {
    page: PropTypes.string
};

export default MenuBar
