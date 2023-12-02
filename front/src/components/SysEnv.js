import React from "react";
import "./SysEnv.css";

const SysEnv = () => {
    return (
        <div className='SysEnv'>
            <div className="title">System Environment</div>

            <div className="subsection">
                <div className="subtitle">CPUs</div>
                <div className="row">Number of cores</div>
                <div className="row">Model</div>
            </div>
            <div className="subsection">
                <div className="subtitle">Memory</div>
                <div className="row">Memory available</div>
            </div>
            <div className="subsection">
                <div className="subtitle">Cloud computing</div>
                <div className="row">Amazon Web Services</div>
            </div>
            <div className="subsection">
                <div className="subtitle">Location</div>
                <div className="row">Korea</div>
            </div>
        </div>
    );
};

export default SysEnv