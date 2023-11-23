
import React, {useState, useEffect} from 'react';
import ReactDOM	from 'react-dom';
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import axios from 'axios';
import Menubar from './components/Menubar.js'


//class History	extends	Component	{
function History(props) {
	//state =>
	const [expList,setExpList] = useState(
		[{id:"001", title:"그린 알고리즘 자바코드 실험 1", footprint: "35.23 mg", runTime:"0.1 ms", createTime:"2023-11-05 10:10:00"},
		 {id:"002", title:"그린 알고리즘 자바코드 실험 2", footprint: "35.25 mg", runTime:"0.2 ms", createTime:"2023-11-05 10:10:01"},
		]
	);

	//componentDidMount() =>
	useEffect(()=>{
		console.log('component mounted!')
		listHist();
	},[])

	//#navigate test
	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();
	const naviTest = () => {
		console.log('#: '+location.pathname);
		console.log('#: '+params.id);
		//navigate('/home');
	}

	const listHist = () => {
		console.log('listHist~');
		
		let param = {};
		axios.post('/listHist.do', param)
		.then(res => {
			console.log('# '+JSON.stringify(res.data));
			//this.setState(res.data) =>
			setExpList(res.data.expList);
		}).catch(error => {
			console.log('#load error '+error)
		})
	}

	const compare = () => {
		navigate('/compare', {state: {id1: "001", id2: "002"}});
	}

	const viewSinglePage = (id) => {
		navigate('/single', {state: {id: [id]}});
	}

	//render() =>
	return (
		<div id="ga">
			<Menubar page={"history"}/>
			
			<div style={{textAlign:"center", margin:"1px", fontSize:"22px"}} >Green Algorithms History</div> 
			<br/>

			<div align="right">
				<button style={{fontSize:"15px", marginRight:"10px"}} onClick={compare} >compare</button>
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
						{ expList.map(exp => (
							<tr	align="center" key={exp.id}>
								<td><input type="checkbox" id="id" name="name" /></td>
								<td><a onClick={()=>{viewSinglePage(exp.id)}}>{exp.title}</a></td>
								<td>{exp.footprint}</td>
								<td>{exp.runTime}</td>
								<td>{exp.createTime}</td>
							</tr>
						))
						}
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

export default History;
