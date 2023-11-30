import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./tip.css";

const Tip = ({ thumbnail = "./thumbnail.png", title = "Title", contents = "abcdefg", idx=0}) => {
    return (
        <Link className="tip" to={`/tips/${idx}`}>
            <img className="thumbnail" alt="thumbnail" src={thumbnail} />
            <div className="right">
                <div className="title">{title}</div>
                <div className="contents">{contents}</div>
            </div>
        </Link>
    );
};

Tip.propTypes = {
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    contents: PropTypes.string,
    idx: PropTypes.number
};

export default Tip