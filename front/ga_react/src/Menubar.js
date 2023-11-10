import React from "react";
import { Link } from "react-router-dom";


const Menubar = () => {
	return (
	<div style={{display: "flex", fontSize:"17px", background:"#e0e0e0", padding:"5px"}}>
		<div >LOGO GA</div>
		<div style={{width:"60%"}}>
			<ul className="menubar">
				<li> <Link to="/home">Home</Link> </li>
				<li> <Link to="/history">History</Link> </li>
				<li> <Link to="/tip">Tip</Link> </li>
			</ul>
		</div>
		<div className="banner"></div>
		
	</div>
	)
}

export default Menubar;