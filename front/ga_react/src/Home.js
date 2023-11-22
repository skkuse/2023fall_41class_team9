import React, { useState, useEffect, useRef } from 'react';
import {useCookies} from 'react-cookie'
import axios from 'axios';

import Loading from './components/Loading.js';
import Editor from '@monaco-editor/react';
import Menubar from './components/Menubar.js'
import './Home.css'

const divSt = { marginLeft: "5px", marginRight: "5px", marginTop: "3px", marginBottom: "3px" };

function Home(props) {
	const editorRef = useRef(null);
	const [cookies, setCookie, removeCookie] = useCookies(['session_key']);
	const [isLoading, setLoading] = useState(false);
	const [exp, setExp] = useState({});

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

	const run = async () => {
		setLoading(true);
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
			}).catch(error => {
				alert('#save error ' + error)
			})

		setExp({id:1,title:"123",run_time:123, car_index:1222});
		setLoading(false);
	}

	// monaco editor handlers
	const handleEditorValidation = (markers) => {markers.forEach((marker) => console.log('onValidate:', marker.message));}
	const handleEditorChange = (value, event) => {console.log('here is the current model value:', value);}
	const handleEditorDidMount = (editor, monaco) => {editorRef.current = editor;}

	return (
		<div>
			{isLoading && <Loading className="loading"/>}
			<Menubar page={"home"} />
			<div style={{ textAlign: "center", margin: "1px", fontSize: "22px" }} >Green Algorithms Home</div>
			<div><button onClick={run}>run and save</button></div>
			<div> experiment name : <input style={{ width: "30%" }} id="title"></input> </div>
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
