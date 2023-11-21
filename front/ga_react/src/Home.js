import React, { useState, useEffect, useRef } from 'react';
import {useCookies} from 'react-cookie'
import ReactDOM from 'react-dom';
import axios from 'axios';

import Editor from '@monaco-editor/react';
import Menubar from './components/Menubar.js'
import './Home.css'

const divSt = { marginLeft: "5px", marginRight: "5px", marginTop: "3px", marginBottom: "3px" };

function Home(props) {
	const editorRef = useRef(null); 
	const [cookies, setCookie, removeCookie] = useCookies(['session_key']);
	const [tresult, setTResult] = useState(
		{
			"runTime": "10 ms", "footprint": "35.23 mg",
			"carIndex": "2.01e-04 km", "planeIndex": "7e-05 %", "treeIndex": "2.01e-04",
			"coreNo": "4", "memory": "4 GB"
		}
	);

	//componentDidMount =>
	useEffect(() => {
		console.log('component mounted!')
	}, [])

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

	async function save () {
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

				/*
				실험결과
				run time : 10 ms
				carbon footprint : 35.23 mg
				car index : 2.01e-04 km
				plane index : 7e-05 %
				tree index : 2.01e-04
			
				서버 시스템 사양
				Number of cores : 4
				Memory available : 4 GB
				*/

				document.getElementById('runTime').innerHTML = "run time : " + res.data.runTime;
				document.getElementById('footprint').innerHTML = "carbon footprint : " + res.data.footprint;
				document.getElementById('carIndex').innerHTML = "car index : " + res.data.carIndex;
				document.getElementById('planeIndex').innerHTML = "plane index : " + res.data.planeIndex;
				document.getElementById('treeIndex').innerHTML = "tree index : " + res.data.teeIndex;
				document.getElementById('coreNo').innerHTML = "Number of cores : " + res.data.coreNo;
				document.getElementById('memory').innerHTML = "Memory available : " + res.data.memory;
			}).catch(error => {
				console.log('#save error ' + error)
			})
	}

	const loadTestData = () => {
		document.getElementById('runTime').innerHTML = "run time : " + tresult.runTime;
		document.getElementById('footprint').innerHTML = "carbon footprint : " + tresult.footprint;
		document.getElementById('carIndex').innerHTML = "car index : " + tresult.carIndex;
		document.getElementById('planeIndex').innerHTML = "plane index : " + tresult.planeIndex;
		document.getElementById('treeIndex').innerHTML = "tree index : " + tresult.teeIndex;
		document.getElementById('coreNo').innerHTML = "Number of cores : " + tresult.coreNo;
		document.getElementById('memory').innerHTML = "Memory available : " + tresult.memory;
	}

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
						height="20vh"
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

			<div className='result' >
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
