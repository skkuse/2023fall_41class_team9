/*
<a href="https://www.flaticon.com/kr/free-icon/car_7524162?term=%EC%9E%90%EB%8F%99%EC%B0%A8&page=1&position=4&origin=search&related_id=7524162" title="자동 아이콘">자동 아이콘  제작자: Talha Dogar - Flaticon</a>
<a href="https://www.flaticon.com/kr/free-icon/co2-cloud_4343315?term=co2&page=1&position=7&origin=search&related_id=4343315" title="co2 구름 아이콘">Co2 구름 아이콘  제작자: bqlqn - Flaticon</a>
<a href="https://www.flaticon.com/kr/free-icon/fly_4524225?k=1700635550936" title="비행기 아이콘">비행기 아이콘  제작자: surang - Flaticon</a>
<a href="https://www.flaticon.com/kr/free-icon/tree_489969?term=%EB%82%98%EB%AC%B4&page=1&position=1&origin=search&related_id=489969" title="나무 아이콘">나무 아이콘  제작자: Freepik - Flaticon</a>
*/

import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import {useLocation} from 'react-router-dom';
import {useCookies} from 'react-cookie'

import Editor from '@monaco-editor/react';
import Menubar from '../components/Menubar.js'
import ResultBox from '../components/ResultBox.js';
import Loading from '../components/Loading.js';
import SysEnv from '../components/SysEnv.js';
import './Home.css'

function SingleExp(props) {
	const editorRef = useRef(null);
    const [cookies, setCookie, removeCookie] = useCookies(['session_key']);
    const [isLoading, setLoading] = useState(false);
	const [exp, setExp] = useState({});
    const location = useLocation();
	//componentDidMount =>
	useEffect(() => {
		console.log('component mounted!')
        requestExp();
	}, [])

	useEffect(() => {
		if (editorRef.current)
        	editorRef.current.setValue(exp.code);
	}, [exp])

    const requestExp = async () => {
        setLoading(true);
        const session_key = cookies.session_key
        const body = {'id_list': location.state.id};
        const headers = {'Authorization':session_key};
        await axios.get('/exp',{ params:body, headers: headers })
            .then(res => {
				console.log((res.data.experiments[0]));
				if (res.data.error)
					throw res.data.error;
                setExp(res.data.experiments[0]);
            }).catch(error => {
                alert(error)
            })
        setLoading(false);
    }

	// monaco editor handlers
	const handleEditorDidMount = (editor, monaco) => {editorRef.current = editor;}

	return (
		<div>
			{isLoading && <Loading className="loading"/>}
			<Menubar/>
			<div className='code-editor'>
				<div className='editor-header'>
					<div className='expname'>{exp.title}</div>
				</div>
				<div className='editor'>
					<Editor
						height="700px"
						defaultLanguage="java"
						defaultValue={exp.code}
						onMount={handleEditorDidMount}
						options={{readOnly: true}}
					/>
				</div>
			</div>

			<div className='exp' >
				<SysEnv/>
				<div className='result'>
					<ResultBox img_src={'./img/runtime.png'} title={'Run Time'} value={exp.run_time} unit={"sec"}/>
					<ResultBox img_src={'./img/co2.png'} title={'Carbon Footprint'} value={exp.footprint} unit={"g CO2e"}/>
					<ResultBox img_src={'./img/tree.png'} title={'Carbon sequestration'} value={exp.tree_index} unit={"tree-month"}/>
					<ResultBox img_src={'./img/car.png'} title={'in a passenger car'} value={exp.car_index} unit={"km"}/>
					<ResultBox img_src={'./img/airplane.png'} title={'of a flight Korea-Japan'} value={exp.plane_index} unit={"%"}/>
				</div>
			</div>
		</div>
	)
}


export default SingleExp;
