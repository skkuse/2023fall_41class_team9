import React, {useState, useEffect} from 'react';
import ReactDOM	from 'react-dom';
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import {useCookies} from 'react-cookie'
import axios from 'axios';

import Menubar from './components/Menubar'

import { BarChart } from '@mui/x-charts/BarChart';

function Compare(props) {
	const [cookies, setCookie, removeCookie] = useCookies(['session_key']);
	const [result1,setResult1] = useState(
		[]
	);
	const [result2,setResult2] = useState(
		[]
	);
	//result3,4,5,6 추가
	const [result3,setResult3] = useState(
		[]
	);
	const [result4,setResult4] = useState(
		[]
	);
	const [result5,setResult5] = useState(
		[]
	);
	const [result6,setResult6] = useState(
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
	//plane index bar chart 추가
	const [piSer,setPiSer] = useState(
		[]
	);
	//tree index bar chart 추가
	const [tiSer,setTiSer] = useState(
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

	// const compare = () => {
	// 	console.log('#compare~');

	// 	//###
	// 	//let param = {ids: ids};
	// 	//let param = {id_list: ids};
	// 	//=>
	// 	let param = '?';
	// 	//ex) /exp?id_list[]=6&id_list[]=7
	// 	for (var i = 0; i < ids.length; i++){
	// 		param = param + 'id_list[]='+ids[i]+'&';
	// 	}
	// 	console.log('#ids.length: '+ids.length);

	// 	console.log('#req param: '+JSON.stringify(param));
	// 	//axios.post('/compare.do', param)
	// 	//axios.get('/exp?id_list[]=6&id_list[]=7')
	// 	axios.get('/exp'+param)
	// 	.then(res => {
	// 		console.log('#resp: '+JSON.stringify(res.data));
	// 		//processData(res.data);
	// 		processData(res.data.experiments);
	// 	}).catch(error => {
	// 		console.log('#axios error '+error)
	// 	})
	// }

	const compare = async () => {
        const session_key = cookies.session_key
        const body = {'id_list': location.state.ids};
        const headers = {'Authorization':session_key};
        await axios.get('/exp',{ params:body, headers: headers })
            .then(res => {
				console.log('#resp: '+JSON.stringify(res.data));
				console.log((res.data.experiments[0]));
				if (res.data.error)
					throw res.data.error;
				processData(res.data.experiments);
            }).catch(error => {
                alert('#save error ' + error)
            })
    }

	const loadTestData = () => {
		let testData = [
			{"title":"그린 알고리즘 자바코드 실험 1","run_time":"12","footprint":"35.23","car_index":"0.0004","plane_index":"0.00007","tree_index":"0.0004","coreNo":"4","memory":"4"},
			{"title":"그린 알고리즘 자바코드 실험 2","run_time":"10","footprint":"36.23","car_index":"0.0003","plane_index":"0.00006","tree_index":"0.0003","coreNo":"4","memory":"4"},
			{"title":"그린 알고리즘 자바코드 실험 3","run_time":"15","footprint":"37.23","car_index":"0.0005","plane_index":"0.00008","tree_index":"0.0005","coreNo":"4","memory":"4"},
		];
		processData(testData)

	}
	const processData = (data) => {
		console.log("#processData~");
		setResult1(data);
		//console.log('#data length: '+data.length);
		//console.log("#run_time: "+data[0].run_time);

		if (data.length>0) {
			setResult1(data[0]);
		}
		if (data.length>1) {
			setResult2(data[1]);
		}

		//result 3,4,5,6추가
		if (data.length>2) {
			setResult3(data[2]);
		}
		if (data.length>3) {
			setResult4(data[3]);
		}
		if (data.length>4) {
			setResult5(data[4]);
		}

		//runtime bar chart data 처리
		let rtList = [];
		let rtData = {};
		let rt = [];
		for(var i=0; i<data.length; i++) {
			rtData = {};
			rt = [];

			rt.push(parseFloat(data[i].run_time)); // rt = [10]
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

			ci.push(parseFloat(data[i].car_index));
			ciData.data = ci;
			//console.log("#ciData: "+JSON.stringify(ciData)+', '+data[i].carIndex);
			ciList.push(ciData)
		}
		console.log("#ciList: "+JSON.stringify(ciList));
		setCiSer(ciList)

		//plane index bar chart data 처리 추가
		let piList = [];
		let piData = {};
		let pi = [];
		for(var i=0; i<data.length; i++) {
			piData = {};
			pi = [];

			pi.push(parseFloat(data[i].plane_index));
			piData.data = pi;
			piList.push(piData)
		}
		console.log("#piList: "+JSON.stringify(piList));
		setPiSer(piList)

		//tree index bar chart data 처리 추가
		let tiList = [];
		let tiData = {};
		let ti = [];
		for(var i=0; i<data.length; i++) {
			tiData = {};
			ti = [];

			ti.push(parseFloat(data[i].tree_index));
			tiData.data = ti;
			tiList.push(tiData)
		}
		console.log("#tiList: "+JSON.stringify(tiList));
		setTiSer(tiList)

		//data.length에 따라 result 3,4,5,6 div display 추가
		if (data.length>2 && data.length <= 3) {
			document.getElementById('r3').style.display = "flex";
		}

		if (data.length>3 && data.length <= 4) {
			document.getElementById('r34').style.display = "flex";
		}

		if (data.length>4) {
			document.getElementById('r34').style.display = "flex";
			document.getElementById('r5').style.display = "flex";
		}

	}



	return (
		<div>
			<Menubar/>

			<div style={{textAlign:"center", margin:"10px", fontSize:"22px"}} >Green Algorithms Compare</div>

			<div id="r1" style={{display:"none", margin:"25px"}}>
				{/* left side */}
				<div style={{width:"100%", margin:"5px"}}>
					<div style={{margin:"5px"}}>
					experiment name : {result3.title}
					</div>

					<div style={{border:"1px solid", width:"100%", xheight:"33vh", margin:"5px"}} >
						<div style={{border:"1px solid", margin:"5px"}}>
							<div>실험결과</div>
							<div>run time : {result1.run_time} </div>
							<div>carbon footprint : {result1.footprint} </div>
							<div>car index : {result1.car_index} </div>
							<div>plane index : {result1.plane_index} </div>
							<div>tree index : {result1.tree_index} </div>
						</div>
					</div>
				</div>

			</div>
			{/* result1,2 */}
			<div id="r12" style={{display:"flex", margin:"2px"}}>
				{/* left side */}
				<div style={{width:"100%", margin:"5px"}}>
					<div style={{margin:"5px"}}>
					experiment name : {result1.title}
					</div>

					<div style={{border:"1px solid", width:"100%", xheight:"33vh", margin:"5px"}} >
						{/*<div style={{border:"1px solid"}}>
							<div>서버 시스템 사양</div>
							<div>Number of cores : {result1.coreNo}</div>
							<div>Memory available : {result1.memory}</div>
						</div>*/}
						<div style={{border:"1px solid", margin:"5px"}}>
							<div>실험결과</div>
							<div>run time : {result1.run_time} </div>
							<div>carbon footprint : {result1.footprint} </div>
							<div>car index : {result1.car_index} </div>
							<div>plane index : {result1.plane_index} </div>
							<div>tree index : {result1.tree_index} </div>
						</div>
					</div>
				</div>

				{/* right side */}
				<div style={{width:"100%", margin:"5px"}}>
					<div style={{margin:"5px"}}>
					experiment name : {result2.title}
					</div>

					<div style={{border:"1px solid", width:"100%", xheight:"33vh", margin:"5px"}} >
						{/*<div style={{border:"1px solid"}}>
							<div>서버 시스템 사양</div>
							<div>Number of cores : {result2.coreNo}</div>
							<div>Memory available : {result2.memory}</div>
						</div>*/}
						<div style={{border:"1px solid", margin:"5px"}}>
							<div>실험결과</div>
							<div>run time : {result2.run_time} </div>
							<div>carbon footprint : {result2.footprint} </div>
							<div>car index : {result2.car_index} </div>
							<div>plane index : {result2.plane_index} </div>
							<div>tree index : {result2.tree_index} </div>
						</div>
					</div>
				</div>
			</div>

			<div id="r3" style={{display:"none", margin:"25px"}}>
				{/* left side */}
				<div style={{width:"100%", margin:"5px"}}>
					<div style={{margin:"5px"}}>
					experiment name : {result3.title}
					</div>

					<div style={{border:"1px solid", width:"100%", xheight:"33vh", margin:"5px"}} >
						<div style={{border:"1px solid", margin:"5px"}}>
							<div>실험결과</div>
							<div>run time : {result3.run_time} </div>
							<div>carbon footprint : {result3.footprint} </div>
							<div>car index : {result3.car_index} </div>
							<div>plane index : {result3.plane_index} </div>
							<div>tree index : {result3.tree_index} </div>
						</div>
					</div>
				</div>

			</div>
			{/* result3,4 추가*/}
			<div id="r34" style={{display:"none", margin:"2px"}}>
				{/* left side */}
				<div style={{width:"100%", margin:"5px"}}>
					<div style={{margin:"5px"}}>
					experiment name : {result3.title}
					</div>

					<div style={{border:"1px solid", width:"100%", xheight:"33vh", margin:"5px"}} >
						<div style={{border:"1px solid", margin:"5px"}}>
							<div>실험결과</div>
							<div>run time : {result3.run_time} </div>
							<div>carbon footprint : {result3.footprint} </div>
							<div>car index : {result3.car_index} </div>
							<div>plane index : {result3.plane_index} </div>
							<div>tree index : {result3.tree_index} </div>
						</div>
					</div>
				</div>

				{/* right side */}
				<div style={{width:"100%", margin:"5px"}}>
					<div style={{margin:"5px"}}>
					experiment name : {result4.title}
					</div>

					<div style={{border:"1px solid", width:"100%", xheight:"33vh", margin:"5px"}} >
						<div style={{border:"1px solid", margin:"5px"}}>
							<div>실험결과</div>
							<div>run time : {result4.run_time} </div>
							<div>carbon footprint : {result4.footprint} </div>
							<div>car index : {result4.car_index} </div>
							<div>plane index : {result4.plane_index} </div>
							<div>tree index : {result4.tree_index} </div>
						</div>
					</div>
				</div>

			</div>


			{/* result5추가 */}
			<div id="r5" style={{display:"none", margin:"25px"}}>
				{/* left side */}
				<div style={{width:"100%", margin:"5px"}}>
					<div style={{margin:"5px"}}>
					experiment name : {result5.title}
					</div>

					<div style={{border:"1px solid", width:"100%", xheight:"33vh", margin:"5px"}} >
						<div style={{border:"1px solid", margin:"5px"}}>
							<div>실험결과</div>
							<div>run time : {result5.run_time} </div>
							<div>carbon footprint : {result5.footprint} </div>
							<div>car index : {result5.car_index} </div>
							<div>plane index : {result5.plane_index} </div>
							<div>tree index : {result5.tree_index} </div>
						</div>
					</div>
				</div>

			</div>


			{/* bar chart */}
			<div style={{margin:"5px"}}>
				<div style={{display:"flex", xborder:"1px solid", xwidth:"100%", height:"40vh"}}>
					<div>
					{/* sample bar chart */}
					{/*<BarChart
						xAxis={[{ scaleType: 'band', data: ['sample'] }]}
						yAxis={[{ label: '#' }]}
						series={ [{ data: [11], }, { data: [7], }, { data: [8], }] }
						width={200}
						height={250}
					/>*/}
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
					{/* plane index bar chart 추가 */}
					<div>
					<BarChart
						xAxis={[{ scaleType: 'band', data: ['plane index'] }]}
						yAxis={[{ label: '' }]}
						series={piSer}
						width={200}
						height={250}
					/>
					</div>
					{/* tree index bar chart 추가 */}
					<div>
					<BarChart
						xAxis={[{ scaleType: 'band', data: ['tree index'] }]}
						yAxis={[{ label: '' }]}
						series={tiSer}
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
