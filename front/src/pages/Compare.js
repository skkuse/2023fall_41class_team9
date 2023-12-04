import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import axios from 'axios';

import Menubar from '../components/Menubar';
import './Compare.css';

import { BarChart } from '@mui/x-charts/BarChart';
import TextResultBox from '../components/TextResultBox';

function Compare(props) {
	const [cookies, setCookie, removeCookie] = useCookies(['session_key']);
	const [result, setResult] = useState([[]]);
	// bar chart
	const [rtSer, setRtSer] = useState([]);
	const [fpSer, setFpSer] = useState([]);
	const [ciSer, setCiSer] = useState([]);
	const [piSer, setPiSer] = useState([]);
	const [tiSer, setTiSer] = useState([]);

	useEffect(() => {
		console.log('component mounted!');
		console.log('#ids: ' + ids);
		compare();
	}, [])

	const location = useLocation();
	const ids = location.state.ids;
	const compare = async () => {
		const session_key = cookies.session_key
		const body = { 'id_list': location.state.ids };
		const headers = { 'Authorization': session_key };
		await axios.get('/exp', { params: body, headers: headers })
			.then(res => {
				console.log('#resp: ' + JSON.stringify(res.data));
				console.log((res.data.experiments[0]));
				if (res.data.error)
					throw res.data.error;
				processData(res.data.experiments);
			}).catch(error => {
				alert('#save error ' + error)
			})
	}

	const processData = (data) => {
		console.log("#processData~");

		setResult(data);
		//runtime bar chart data 처리
		let rtList = [];
		let rtData = {};
		let rt = [];
		for (var i = 0; i < data.length; i++) {
			rtData = {};
			rt = [];

			rt.push(parseFloat(data[i].run_time)); // rt = [10]
			rtData.data = rt; //rtData = { data: [10]}
			//console.log("#rtData: "+JSON.stringify(rtData));
			rtList.push(rtData) //rtList = [ { data: [10]} ]
		}
		console.log("#rtList: " + JSON.stringify(rtList));
		setRtSer(rtList)

		//carbon footprint bar chart data 처리
		let fpList = [];
		let fpData = {};
		let fp = [];
		for (var i = 0; i < data.length; i++) {
			fpData = {};
			fp = [];

			fp.push(parseFloat(data[i].footprint));
			fpData.data = fp;
			fpList.push(fpData)
		}
		console.log("#fpList: " + JSON.stringify(fpList));
		setFpSer(fpList)

		//car index bar chart data 처리
		let ciList = [];
		let ciData = {};
		let ci = [];
		for (var i = 0; i < data.length; i++) {
			ciData = {};
			ci = [];

			ci.push(parseFloat(data[i].car_index));
			ciData.data = ci;
			//console.log("#ciData: "+JSON.stringify(ciData)+', '+data[i].carIndex);
			ciList.push(ciData)
		}
		console.log("#ciList: " + JSON.stringify(ciList));
		setCiSer(ciList)

		//plane index bar chart data 처리 추가
		let piList = [];
		let piData = {};
		let pi = [];
		for (var i = 0; i < data.length; i++) {
			piData = {};
			pi = [];

			pi.push(parseFloat(data[i].plane_index));
			piData.data = pi;
			piList.push(piData)
		}
		console.log("#piList: " + JSON.stringify(piList));
		setPiSer(piList)

		//tree index bar chart data 처리 추가
		let tiList = [];
		let tiData = {};
		let ti = [];
		for (var i = 0; i < data.length; i++) {
			tiData = {};
			ti = [];

			ti.push(parseFloat(data[i].tree_index));
			tiData.data = ti;
			tiList.push(tiData)
		}
		console.log("#tiList: " + JSON.stringify(tiList));
		setTiSer(tiList)
	}



	return (
		<div>
			<Menubar />
			<div className='compare-title'>Compare Experiments</div>
			<div className='compare-container'>
				<div className='text-result-container'>
					{result.map((element, idx) => {
						return <TextResultBox key={idx} result={element} />
					})};
				</div>
				{/* bar chart */}

				<div className='bar-chart-container'>
					<div className='title'>Bar Chart</div>
					<div className='bar-chart'>
						{/* runtime bar chart */}
						<div>
							<BarChart
								xAxis={[{ scaleType: 'band', data: ['run time'] }]}
								yAxis={[{ label: 'sec' }]}
								series={rtSer}
								width={300}
								height={400}
							/>
						</div>
						{/* carbon footprint bar chart */}
						<div>
							<BarChart
								xAxis={[{ scaleType: 'band', data: ['carbon footprint'] }]}
								yAxis={[{ label: 'kg CO2e' }]}
								series={fpSer}
								width={300}
								height={400}
							/>
						</div>
						{/* car index bar chart */}
						<div>
							<BarChart
								xAxis={[{ scaleType: 'band', data: ['of a passenger car Seoul-Busan'] }]}
								yAxis={[{ label: '%' }]}
								series={ciSer}
								width={300}
								height={400}
							/>
						</div>
						{/* plane index bar chart 추가 */}
						<div>
							<BarChart
								xAxis={[{ scaleType: 'band', data: ['of a flight Korea-Japan'] }]}
								yAxis={[{ label: '%' }]}
								series={piSer}
								width={300}
								height={400}
							/>
						</div>
						{/* tree index bar chart 추가 */}
						<div>
							<BarChart
								xAxis={[{ scaleType: 'band', data: ['Carbon sequestration'] }]}
								yAxis={[{ label: 'tree-month' }]}
								series={tiSer}
								width={300}
								height={400}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Compare;
