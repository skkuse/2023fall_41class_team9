import React from "react";
import "./ResultBox.css";

const ResultBox = ({ img_src, title, value }) => {
    return (
        <div className='ResultBox'>
            <div className="left">
                <img className="icon" alt="Icon" src={img_src} />
                <div className="title">{title}</div>
            </div>
            <div className="right">
                <div className="value">{value}mg</div>
            </div>
        </div>
    );
};

export default ResultBox