import React from "react";
import "./SysEnv.css";

const SysEnv = () => {
    return (
        <div className='SysEnv'>
            <div className="title">System Environment</div>

            <div className="subsection">
                <div className="subtitle">CPUs</div>
                <div className="row">
                    <div className="subsubtitle">Number of cores</div>
                    <div className="content">4</div>
                </div>
                <div className="row">
                    <div className="subsubtitle">Model</div>
                    <div className="content">4</div>
                </div>
            </div>
            <div className="subsection">
                <div className="subtitle">Memory</div>
                <div className="row">
                    <div className="subsubtitle">Memory available</div>
                    <div className="content">4</div>
                </div>
            </div>
            <div className="subsection">
                <div className="subtitle">Cloud computing</div>
                <div className="row">
                    <div className="subsubtitle">Cloud computing</div>
                    <div className="content">Amazon Web Services</div>
                </div>
            </div>
            <div className="subsection">
                <div className="subtitle">Location</div>
                <div className="row">
                    <div className="subsubtitle">Cloud computing</div>
                    <div className="content">Korea</div>
                </div>
            </div>
        </div>
    );
};

export default SysEnv