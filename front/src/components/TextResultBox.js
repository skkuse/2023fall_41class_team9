import React from "react";
import "./TextResultBox.css";

const TextResultBox = ({ result }) => {
    return (
        <div className="text-result-box">
            <div className='title'> Experiment name : {result.title} </div>
            <div className="subsection">
                <div className="row">
                    <div className="subtitle">Run Time:</div>
                    <div className="contents">{result.run_time} sec </div>
                </div>
                <div className="row">
                    <div className="subtitle">Carbon Footprint:</div>
                    <div className="contents">{result.footprint} kg CO2e </div>
                </div>
                <div className="row">
                    <div className="subtitle">Carbon sequestration:</div>
                    <div className="contents">{result.tree_index} tree-month</div>
                </div>
                <div className="row">
                    <div className="subtitle">of a passenger car Seoul-Busan:</div>
                    <div className="contents">{result.car_index} %</div>
                </div>
                <div className="row">
                    <div className="subtitle">of a flight Korea-Japan:</div>
                    <div className="contents">{result.plane_index} %</div>
                </div>
            </div>
        </div>
    );
};

export default TextResultBox