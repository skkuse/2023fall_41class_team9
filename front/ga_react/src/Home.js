/*
<a href="https://www.flaticon.com/kr/free-icon/car_7524162?term=%EC%9E%90%EB%8F%99%EC%B0%A8&page=1&position=4&origin=search&related_id=7524162" title="자동 아이콘">자동 아이콘  제작자: Talha Dogar - Flaticon</a>
<a href="https://www.flaticon.com/kr/free-icon/co2-cloud_4343315?term=co2&page=1&position=7&origin=search&related_id=4343315" title="co2 구름 아이콘">Co2 구름 아이콘  제작자: bqlqn - Flaticon</a>
<a href="https://www.flaticon.com/kr/free-icon/fly_4524225?k=1700635550936" title="비행기 아이콘">비행기 아이콘  제작자: surang - Flaticon</a>
<a href="https://www.flaticon.com/kr/free-icon/tree_489969?term=%EB%82%98%EB%AC%B4&page=1&position=1&origin=search&related_id=489969" title="나무 아이콘">나무 아이콘  제작자: Freepik - Flaticon</a>
*/


import React, { useState, useEffect, useRef } from 'react';
import {useCookies} from 'react-cookie'
import axios from 'axios';

import Loading from './components/Loading.js';
import Editor from '@monaco-editor/react';
import Menubar from './components/Menubar.js'
import ResultBox from './components/ResultBox.js';
import './Home.css'

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
		const headers = {"Authorization": session_key}
		const body = { 
			"title": title,
			"code": code
		};
		console.log(headers);
		console.log(body);
		await axios.post('/exp', body,{headers:headers})
			.then(res => {
				console.log('#result: ' + JSON.stringify(res.data));
				setExp(res.data);
			}).catch(error => {
				alert('#save error ' + error)
			})

		setExp({id:1,title:"123",run_time:123, car_index:1222, footprint:100, tree_index:22, plane_index:44});
		setLoading(false);
	}

	// monaco editor handlers
	const handleEditorValidation = (markers) => {markers.forEach((marker) => console.log('onValidate:', marker.message));}
	const handleEditorDidMount = (editor, monaco) => {editorRef.current = editor;}

	return (
		<div>
			{isLoading && <Loading className="loading"/>}
			<Menubar page={"home"} />
			<div style={{ textAlign: "center", margin: "1px", fontSize: "22px" }} >Green Algorithms Home</div>
			<div className='code-editor'>
				<div className='editor-header'>
					<div style={{flex:0}}><input id="ifile" type="file" onChange={readFile} ></input></div>
					<div style={{flex:1}}> experiment name : <input style={{ width: "50%" }} id="title"></input> </div>
					<button className='run-button' onClick={run}>
						<div className='text-run'>Run</div>
					</button>
				</div>
				<div className='editor'>
					<Editor
						height="65vh"
						defaultLanguage="java"
						defaultValue="// some comment"
						onMount={handleEditorDidMount}
						onValidate={handleEditorValidation}
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
					<div className='row'>
						<ResultBox img_src={'./img/co2.png'} title={'Carbon Footprint'} value={exp.footprint}/>
						<ResultBox img_src={'./img/tree.png'} title={'Carbon sequestration'} value={exp.tree_index}/>
					</div>
					<div className='row'>
						<ResultBox img_src={'./img/car.png'} title={'in a passenger car'} value={exp.car_index}/>
						<ResultBox img_src={'./img/airplane.png'} title={'of a flight Korea-Japan'} value={exp.plane_index}/>
					</div>
					
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
