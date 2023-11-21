import React, { useState, useEffect, useRef } from 'react';
import {useCookies} from 'react-cookie'
import { trackPromise } from 'react-promise-tracker';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Editor from '@monaco-editor/react';
import Menubar from './components/Menubar.js'
import './Home.css'

const divSt = { marginLeft: "5px", marginRight: "5px", marginTop: "3px", marginBottom: "3px" };

function Home(props) {
	const editorRef = useRef(null); 
	const [cookies, setCookie, removeCookie] = useCookies(['session_key']);
	const [exp, setExp] = useState(
		{
			"id":1,
			"title":"test",
			"run_time": 10, 
			"footprint": 35.23,
			"car_index": 2.01e-04, 
			"plane_index": 7e-05, 
			"tree_index": 2.01e-04,
			"create_time":"20231213"
		}
	);

	//componentDidMount =>
	useEffect(() => {
		console.log('component mounted!')
	}, [exp])

	const readFile = () => {
		let file = document.getElementById('ifile').files[0];
		let reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function () {
			editorRef.current.setValue(reader.result)
		};
		reader.onerror = function () {
			console.log(reader.error);
		};
	}

	const save = async () => {
		const code = editorRef.current.getValue();
		const title = document.getElementById('title').value;
		const session_key = cookies.session_key;
		console.log('session_key:',session_key)
		const headers = {'session_key': session_key}
		const param = { 
			"code": code, 
			"title": title 
		};
		
		await axios.post('/exp', param,{headers:headers})
			.then(res => {
				console.log('#result: ' + JSON.stringify(res.data));
				setExp(res.data);
				// document.getElementById('runTime').innerHTML = "run time : " + res.data.run_time;
				// document.getElementById('footprint').innerHTML = "carbon footprint : " + res.data.footprint;
				// document.getElementById('carIndex').innerHTML = "car index : " + res.data.car_index;
				// document.getElementById('planeIndex').innerHTML = "plane index : " + res.data.plane_index;
				// document.getElementById('treeIndex').innerHTML = "tree index : " + res.data.tree_index;
			}).catch(error => {
				alert('#save error ' + error)
			})
	}

	// const loadTestData = () => {
	// 	document.getElementById('runTime').innerHTML = "run time : " + tresult.runTime;
	// 	document.getElementById('footprint').innerHTML = "carbon footprint : " + tresult.footprint;
	// 	document.getElementById('carIndex').innerHTML = "car index : " + tresult.carIndex;
	// 	document.getElementById('planeIndex').innerHTML = "plane index : " + tresult.planeIndex;
	// 	document.getElementById('treeIndex').innerHTML = "tree index : " + tresult.teeIndex;
	// 	document.getElementById('coreNo').innerHTML = "Number of cores : " + tresult.coreNo;
	// 	document.getElementById('memory').innerHTML = "Memory available : " + tresult.memory;
	// }

	// monaco editor handlers
	const handleEditorValidation = (markers) => {markers.forEach((marker) => console.log('onValidate:', marker.message));}
	const handleEditorChange = (value, event) => {console.log('here is the current model value:', value);}
	const handleEditorDidMount = (editor, monaco) => {editorRef.current = editor;}

	return (
		<div>
			<Menubar page={"home"} />
			<div style={{ textAlign: "center", margin: "1px", fontSize: "22px" }} >Green Algorithms Home</div>
			<div className='code-editor' style={divSt}>
				<div>source code</div>
				<div><input id="ifile" type="file" onChange={readFile} ></input></div>
				<div className='editor'>
					<Editor
						height="40vh"
						defaultLanguage="java"
						defaultValue="// some comment"
						onMount={handleEditorDidMount}
						onValidate={handleEditorValidation}
						onChange={handleEditorChange}
					/>
				</div>
			</div>
			<div> experiment name : <input style={{ width: "30%" }} id="title"></input> </div>

			<div><button onClick={save}>run and save</button></div>

			<div className='exp' >
				<div className='sysenv'>
					<div>서버 시스템 사양</div>
					<div>
						Number of cores : 4
					</div>
					<div>
						Nemory available : 4 GB
					</div>
				</div>
				<div className='result'>
					<div>실험결과</div>
					<div id="runTime">run time: {exp.run_time}ms</div>
					<div id="footprint">{exp.footprint}</div>
					<div id="carIndex">{exp.car_index}</div>
					<div id="planeIndex">{exp.plane_index}</div>
					<div id="treeIndex">{exp.tree_index}</div>
				</div>
			</div>
		</div>
	)
}


export default Home;
