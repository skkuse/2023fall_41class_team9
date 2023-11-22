import React from "react";
import './loading.css'
const Loading = ({page}) => {
    console.log(page)
    return (
        <div className="overlay">
            <div className="box">
                <img src='./img/spinner.gif'></img>
            </div>
        </div>
    );
};

export default Loading
