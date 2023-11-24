import React, {useState, useEffect} from 'react';
import ReactDOM	from 'react-dom';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';

import Menubar from './Menubar'

//css use example
const divSt = {marginLeft:"5px", marginRight:"5px", marginTop:"3px", marginBottom:"3px"};

function Home(props) {
	const [tresult,setTResult] = useState(
		{"runTime":"10","footprint":"35.23",
		 "carIndex":"0.0002","planeIndex":"0.00007","treeIndex":"0.0004",
		 "coreNo":"4","memory":"4"
		} 
	);

	const navigate = useNavigate();
	const location = useLocation();
	
	//componentDidMount =>
	useEffect(()=>{
		console.log('component mounted!');
		let pathName = location.pathname;
		if (pathName == '/homeDetail') {
			doDetail();
		} else {
			clear();
		}
	},[location])

	const readFile = () => {
		let file = document.getElementById('file').files[0];
		let reader = new FileReader();
		reader.readAsText(file);

		reader.onload = function() {
			console.log(reader.result);
			var code = document.getElementById('code');
			code.value = reader.result;
		};
		reader.onerror = function() {
			console.log(reader.error);
		};
	}

	const save = () => {
		console.log('hi save~');
		
		let code = document.getElementById('code').value;
		console.log("#code");
		console.log(code);
		
		let title = document.getElementById('title').value;
		
		let param = {code: code, title: title};

		axios.post('/save.do', param)
		.then(res => {
			console.log('#result: '+JSON.stringify(res.data));
			
			/*
			실험결과
			run time : 10
			carbon footprint : 35.23
			car index : 0.0002
			plane index : 0.00007
			tree index : 0.0002
    	
			서버 시스템 사양
			Number of cores : 4
			Memory available : 4
			*/
			
			document.getElementById('runTime').innerHTML = "run time : " + res.data.runTime;
			document.getElementById('footprint').innerHTML = "carbon footprint : " + res.data.footprint;
			document.getElementById('carIndex').innerHTML = "car index : " + res.data.carIndex;
			document.getElementById('planeIndex').innerHTML = "plane index : " + res.data.planeIndex;
			document.getElementById('treeIndex').innerHTML = "tree index : " + res.data.teeIndex;
			document.getElementById('coreNo').innerHTML = "Number of cores : " + res.data.coreNo;
			document.getElementById('memory').innerHTML = "Memory available : " + res.data.memory;
		}).catch(error => {
			console.log('#save error '+error)
		})
	}

	const loadTestData = () => {
		document.getElementById('runTime').innerHTML = "run time : " + tresult.runTime;
		document.getElementById('footprint').innerHTML = "carbon footprint : " + tresult.footprint;
		document.getElementById('carIndex').innerHTML = "car index : " + tresult.carIndex;
		document.getElementById('planeIndex').innerHTML = "plane index : " + tresult.planeIndex;
		document.getElementById('treeIndex').innerHTML = "tree index : " + tresult.treeIndex;
		document.getElementById('coreNo').innerHTML = "Number of cores : " + tresult.coreNo;
		document.getElementById('memory').innerHTML = "Memory available : " + tresult.memory;
	}

	const doDetail = () => {
		console.log('#doDetail');
		//selectDetail();
		loadTestData();
		
		document.getElementById('file').disabled = true;
		document.getElementById('save').disabled = true;
		document.getElementById('title').readOnly = true;
	}	

	const selectDetail = () => {
		console.log('#selectDetail');
		let id = location.state.id;
		console.log('#id: '+id);
		
		let param = {id: id};

		axios.post('/selectDetail.do', param)
		.then(res => {
			console.log('#result: '+JSON.stringify(res.data));
			document.getElementById('code').innerHTML = res.data.code;
			document.getElementById('title').value = res.data.expName;
			document.getElementById('runTime').innerHTML = "run time : " + res.data.runTime;
			document.getElementById('footprint').innerHTML = "carbon footprint : " + res.data.footprint;
			document.getElementById('carIndex').innerHTML = "car index : " + res.data.carIndex;
			document.getElementById('planeIndex').innerHTML = "plane index : " + res.data.planeIndex;
			document.getElementById('treeIndex').innerHTML = "tree index : " + res.data.teeIndex;
			document.getElementById('coreNo').innerHTML = "Number of cores : " + res.data.coreNo;
			document.getElementById('memory').innerHTML = "Memory available : " + res.data.memory;
		}).catch(error => {
			console.log('#selectDetail error '+error)
		})
	}
	
	const clear = () => {
		document.getElementById('code').innerHTML = '';
		document.getElementById('title').value = '';
		document.getElementById('runTime').innerHTML = '';
		document.getElementById('footprint').innerHTML = '';
		document.getElementById('carIndex').innerHTML = '';
		document.getElementById('planeIndex').innerHTML = '';
		document.getElementById('treeIndex').innerHTML = '';
		document.getElementById('coreNo').innerHTML = '';
		document.getElementById('memory').innerHTML = '';
		
		document.getElementById('file').disabled = false;
		document.getElementById('save').disabled = false;
		document.getElementById('title').readOnly = false;
	}
	
	return (
		<div>
			<Menubar/>
			
			<div style={{textAlign:"center", margin:"1px", fontSize:"22px"}} >Green Algorithms Home</div> 

			<div>source code</div>
			<div>
				<input id="file" type="file" onChange={readFile} ></input>
			</div>

			<div>
				<textarea id="code" style={{width:"100%", height:"20vh"}} spellCheck="false"/>
			</div>

			<div>
				experiment name : <input style={{width: "30%"}} id="title"></input>
			</div>

			<div>
				<button id="save" onClick={loadTestData}>run and save</button>
			</div>
			
			<div style={{display:"flex", border:"1px solid", height:"30vh"}} >
				<div style={{width:"50%", border:"1px solid"}}>
					<div>서버 시스템 사양</div>
					<div id="coreNo"></div>
					<div id="memory"></div>
				</div>
				<div style={{width:"50%", border:"1px solid"}}>
					<div>실험결과</div>
					<div id="runTime"></div>
					<div id="footprint"></div>
					<div id="carIndex"></div>
					<div id="planeIndex"></div>
					<div id="treeIndex"></div>
				</div>
			</div>

		</div>
	)
}

export default Home;
