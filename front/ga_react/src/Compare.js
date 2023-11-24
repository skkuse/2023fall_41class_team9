import React, {useState, useEffect} from 'react';
import ReactDOM	from 'react-dom';
import {useNavigate, useLocation, useParams} from 'react-router-dom';

import axios from 'axios';
import Menubar from './components/Menubar'

function Compare(props) {
	const [result,setResult] = useState(
		{}
	);

	useEffect(()=>{
		console.log('component mounted!');
		console.log('#id1, id2: '+id1+', '+id2);
		compare();
	},[])

	const location = useLocation();
	const id1 = location.state.id1;
	const id2 = location.state.id2;

	const compare = () => {
		console.log('compare~');
		
		let param = {id1: id1, id2: id2};
		axios.post('/compare.do', param)
		.then(res => {
			console.log('# '+JSON.stringify(res.data));
			setResult(res.data);
			document.getElementById('ita1').value = result.code1;
		}).catch(error => {
			console.log('#load error '+error)
		})
	}
	
	return (
		<div>
			<Menubar/>
		
			<div style={{textAlign:"center", margin:"10px", fontSize:"22px"}} >Green Algorithms Compare</div> 
			
			<div style={{display:"flex"}}>
				{/* left side */}
				<div style={{width:"100%"}}>
					<div>
					experiment name : {result.expName1}
					</div>

					<div>source code1</div>
					<div>
						<textarea id="ita1" style={{width:"100%", height:"30vh"}} value={result.code1} spellCheck="false">
						</textarea>
					</div>

					<div style={{border:"1px solid", width:"100%", height:"40vh"}} >
						<div style={{border:"1px solid"}}>
							<div>서버 시스템 사양</div>
							<div>Number of cores : {result.coreNo1}</div>
							<div>Memory available : {result.memory1}</div>
						</div>
						<div style={{border:"1px solid"}}>
							<div>실험결과</div>
							<div>run time : {result.runTime1} </div>
							<div>carbon footprint : {result.footprint1} </div>
							<div>car index : {result.carIndex1} </div>
							<div>plane index : {result.planeIndex1} </div>
							<div>tree index : {result.treeIndex1} </div>
						</div>
					</div>
				</div>
			
				{/* right side */}
				<div style={{width:"100%"}}>
					<div>
					experiment name : 그린 알고리즘 자바코드 실험 2
					</div>

					<div>source code2</div>
					<div>
						<textarea id="ita2" style={{width:"100%", height:"30vh"}} spellCheck="false" />
					</div>

					<div style={{border:"1px solid", width:"100%", height:"40vh"}} >
						<div style={{border:"1px solid"}}>
							<div>서버 시스템 사양</div>
							<div>~</div>
							<div>~</div>
							</div>
						<div style={{border:"1px solid"}}>
							<div>실험결과</div>
							<div>~</div>
							<div>~</div>
							<div>~</div>
							<div>~</div>
							<div>~</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	)
}

export default Compare;
