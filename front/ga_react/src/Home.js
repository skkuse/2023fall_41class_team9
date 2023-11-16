import React, {Component} from 'react';
import ReactDOM	from 'react-dom';
import axios from 'axios';

import Menubar from './components/Menubar.js'
const divSt = {marginLeft:"5px", marginRight:"5px", marginTop:"3px", marginBottom:"3px"};

class Home	extends	Component	{
	constructor() {
		super();
	}

	state =	{
	}

	componentDidMount()	{
		console.log('# component did mount home');
	}

	hi = () => {
		console.log('hi~')
	}

	readFile = () => {
		let file = document.getElementById('ifile').files[0];
		let reader = new FileReader();
		reader.readAsText(file);

		reader.onload = function() {
			console.log(reader.result);
			var ita = document.getElementById('ita');
			ita.value = reader.result;
		};
		reader.onerror = function() {
			console.log(reader.error);
		};
	}

	save = () => {
		/*
		console.log('hi save~');
		let text = document.getElementById('ita').value;
		console.log(text);
		
		let param = {text: text};
		axios.post('/save.do', param)
		.then(res => {
			console.log('# '+JSON.stringify(res.data));
		}).catch(error => {
			console.log('#load error '+error)
			this.setState({message: 'load 오류입니다'})
		})
		*/
		
		 console.log("~"+document.getElementById("ename").value);
	}
	
	render() {
		console.log('# component render home');
		return (
		<div id="ga">
			<Menubar page={"home"}/>
			
			<div style={{textAlign:"center", margin:"1px", fontSize:"22px"}} >Green Algorithms Home</div> 

			<div>source code</div>
			<div>
				<input id="ifile" type="file" onChange={this.readFile} ></input>
			</div>

			<div>
				<textarea id="ita" style={{width:"100%", height:"20vh"}} />
			</div>

			<div>
				experiment name : <input style={{width: "30%"}} id="ename"></input>
			</div>

			<div>
				<button id="id" onClick={this.save}>run and save</button>
			</div>
			
			<div style={{display:"flex", border:"1px solid", height:"30vh"}} >
				<div style={{width:"50%", border:"1px solid"}}>
					<div>서버 시스템 사양</div>
					<div>
						Number of cores : 4
					</div>
					<div>
						Nemory available : 4 GB
					</div>
				</div>
				<div style={{width:"50%", border:"1px solid"}}>
					<div>실험결과</div>
					<div>
						run time : 10 ms
					</div>
					<div>
						carbon footprint: 35.23 mg 
					</div>
					<div>
						car index : 2.01e-04 km 
					</div>
					<div>
						plane index : 7e-05 %
					</div>
					<div>
						tree index : 2.01e-04
					</div>
				</div>
			</div>
		</div>
		)
	}
}

export default Home;
