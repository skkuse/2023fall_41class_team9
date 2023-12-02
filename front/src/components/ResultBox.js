import React from "react";
import "./ResultBox.css";

const ResultBox = ({ img_src, title, value }) => {
    return (
        <div className='ResultBox'>
            <img className="icon" alt="Icon" src={img_src} />
            <div className="value">{value}mg</div>
            <div className="title">{title}</div>
        </div>
    );
};

export default ResultBox