import React, {Component} from 'react';
import ReactDOM	from 'react-dom';
import axios from 'axios';

import Menubar from './components/Menubar.js'

class History	extends	Component	{
	constructor() {
		super();
	}

	state =	{
	}

	componentDidMount()	{
		console.log('# component did mount history');
	}

	/*
	save = () => {
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
	}
	*/
	
	render() {
		console.log('# component render History');
		return (
		<div id="ga">
			<Menubar/>
			
			<div style={{textAlign:"center", margin:"1px", fontSize:"22px"}} >Green Algorithms History</div> 
			<br/>
			
			<div align="right">
				<button style={{fontSize:"15px", marginRight:"10px"}}>compare</button>
			</div>
			
  			<div>
  				<table className="table" style={{width:"100%"}}>
  					<thead>
  					<tr align="center">
  						<td width="10%">체크</td>
  						<td width="30%">Experiment Name</td>
  						<td width="10%">탄소배출량</td>
  						<td width="20%">런타임</td>
  						<td width="20%">Create Time</td>
  					</tr>
  					</thead>
  					<tbody id="itbody">
						<tr align="center">
							<td><input type="checkbox" id="id" name="name" /></td>
							<td><a href="/home">그린 알고리즘 자바코드 실험 1</a></td>
							<td>35.23 mg</td>
							<td>0.1 ms</td>
							<td>2023-11-05 10:10:00</td>
						</tr>
						<tr align="center">
							<td>~</td>
							<td>~</td>
							<td>~</td>
							<td>~</td>
							<td>~</td>
						</tr>
  					</tbody>
  				</table>
  			</div>


		</div>
		)
	}
}

export default History;
