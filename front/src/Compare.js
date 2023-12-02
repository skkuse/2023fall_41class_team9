import React, {useState, useEffect} from 'react';
import ReactDOM	from 'react-dom';
import {useNavigate, useLocation, useParams} from 'react-router-dom';

import axios from 'axios';

import Menubar from './components/Menubar'

import { BarChart } from '@mui/x-charts/BarChart';

function Compare(props) {
	const [result1,setResult1] = useState(
		[]
	);
	const [result2,setResult2] = useState(
		[]
	);

	//bar chart data example 
	const [sampleSer,setSampleSer] = useState(
		[	{ data: [11], }, 
			{ data: [7], },
		]
	); 
	
	const [rtSer,setRtSer] = useState(
		[]
	); 
	const [fpSer,setFpSer] = useState(
		[]
	); 
	const [ciSer,setCiSer] = useState(
		[]
	); 

	useEffect(()=>{
		console.log('component mounted!');
		console.log('#ids: '+ids);
		compare();
		//loadTestData();
	},[])

	const location = useLocation();
	const ids = location.state.ids;

	const compare = () => {
		console.log('#compare~');
		
		let param = {ids: ids};
		console.log('#req param: '+JSON.stringify(param));
		axios.post('/compare.do', param)
		.then(res => {
			console.log('# '+JSON.stringify(res.data));
			processData(res.data);
		}).catch(error => {
			console.log('#axios error '+error)
		})
	}

	const loadTestData = () => {
		let testData = [
			{"expName":"그린 알고리즘 자바코드 실험 1","runTime":"12","footprint":"35.23","carIndex":"0.0004","planeIndex":"0.00007","treeIndex":"0.0004","coreNo":"4","memory":"4"},
			{"expName":"그린 알고리즘 자바코드 실험 2","runTime":"10","footprint":"36.23","carIndex":"0.0003","planeIndex":"0.00006","treeIndex":"0.0003","coreNo":"4","memory":"4"},
			{"expName":"그린 알고리즘 자바코드 실험 3","runTime":"15","footprint":"37.23","carIndex":"0.0005","planeIndex":"0.00008","treeIndex":"0.0005","coreNo":"4","memory":"4"},
		];
		processData(testData)
		
	}	
	const processData = (data) => {
		console.log("#processData~");
		setResult1(data);
		console.log('#data length: '+data.length);
		console.log("#runTime: "+data[0].runTime);
		
		if (data.length>0) {
			setResult1(data[0]);
		}
		if (data.length>1) {
			setResult2(data[1]);
		}
		
		//runtime bar chart data 처리
		let rtList = [];
		let rtData = {};
		let rt = [];
		for(var i=0; i<data.length; i++) {
			rtData = {};			
			rt = [];

			rt.push(parseFloat(data[i].runTime)); // rt = [10]
			rtData.data = rt; //rtData = { data: [10]}
			//console.log("#rtData: "+JSON.stringify(rtData));
			rtList.push(rtData) //rtList = [ { data: [10]} ]
		}
		console.log("#rtList: "+JSON.stringify(rtList));
		setRtSer(rtList)

		//carbon footprint bar chart data 처리
		let fpList = [];
		let fpData = {};
		let fp = [];
		for(var i=0; i<data.length; i++) {
			fpData = {};			
			fp = [];

			fp.push(parseFloat(data[i].footprint));
			fpData.data = fp;
			fpList.push(fpData)
		}
		console.log("#fpList: "+JSON.stringify(fpList));
		setFpSer(fpList)

		//car index bar chart data 처리
		let ciList = [];
		let ciData = {};
		let ci = [];
		for(var i=0; i<data.length; i++) {
			ciData = {};			
			ci = [];

			ci.push(parseFloat(data[i].carIndex));
			ciData.data = ci;
			//console.log("#ciData: "+JSON.stringify(ciData)+', '+data[i].carIndex);
			ciList.push(ciData)
		}
		console.log("#ciList: "+JSON.stringify(ciList));
		setCiSer(ciList)
	}
	


	return (
		<div>
			<Menubar/>
		
			<div style={{textAlign:"center", margin:"10px", fontSize:"22px"}} >Green Algorithms Compare</div> 
			
			<div style={{display:"flex"}}>
				{/* left side */}
				<div style={{width:"100%"}}>
					<div>
					experiment name : {result1.expName}
					</div>

					<div style={{border:"1px solid", width:"100%", height:"33vh"}} >
						<div style={{border:"1px solid"}}>
							<div>서버 시스템 사양</div>
							<div>Number of cores : {result1.coreNo}</div>
							<div>Memory available : {result1.memory}</div>
						</div>
						<div style={{border:"1px solid"}}>
							<div>실험결과</div>
							<div>run time : {result1.runTime} </div>
							<div>carbon footprint : {result1.footprint} </div>
							<div>car index : {result1.carIndex} </div>
							<div>plane index : {result1.planeIndex} </div>
							<div>tree index : {result1.treeIndex} </div>
						</div>
					</div>
				</div>
			
				{/* right side */}
				<div style={{width:"100%"}}>
					<div>
					experiment name : {result2.expName}
					</div>

					<div style={{border:"1px solid", width:"100%", height:"33vh"}} >
						<div style={{border:"1px solid"}}>
							<div>서버 시스템 사양</div>
							<div>Number of cores : {result2.coreNo}</div>
							<div>Memory available : {result2.memory}</div>
							</div>
						<div style={{border:"1px solid"}}>
							<div>실험결과</div>
							<div>run time : {result2.runTime} </div>
							<div>carbon footprint : {result2.footprint} </div>
							<div>car index : {result2.carIndex} </div>
							<div>plane index : {result2.planeIndex} </div>
							<div>tree index : {result2.treeIndex} </div>
						</div>
					</div>
				</div>
			</div>
			
			{/* bar chart */}
			<div>
				<div style={{display:"flex", xborder:"1px solid", xwidth:"100%", height:"40vh"}}>
					<div>
					{/* sample bar chart */}		
					<BarChart
						xAxis={[{ scaleType: 'band', data: ['sample'] }]}
						yAxis={[{ label: '#' }]}
						series={ [{ data: [11], }, { data: [7], }, { data: [8], }] }
						width={200}
						height={250}
					/>
					</div>
					{/* runtime bar chart */}		
					<div>				
					<BarChart
						xAxis={[{ scaleType: 'band', data: ['runtime'] }]}
						yAxis={[{ label: '' }]}
						series={rtSer}
						width={200}
						height={250}
					/>
					</div>
					{/* carbon footprint bar chart */}		
					<div>				
					<BarChart
						xAxis={[{ scaleType: 'band', data: ['carbon footprint'] }]}
						yAxis={[{ label: '' }]}
						series={fpSer}
						width={200}
						height={250}
					/>
					</div>
					{/* car index bar chart */}	
					<div>				
					<BarChart
						xAxis={[{ scaleType: 'band', data: ['car index'] }]}
						yAxis={[{ label: '' }]}
						series={ciSer}
						width={200}
						height={250}
					/>
					</div>

				</div>
			</div>

		</div>
	)
}

export default Compare;
