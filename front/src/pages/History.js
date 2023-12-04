
import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import axios from 'axios';

import Menubar from '../components/Menubar.js'
import './History.css'

//###
import {useCookies} from 'react-cookie';

function History(props) {
	//###
	const [cookies, setCookie, removeCookie] = useCookies(['session_key']);
	const [check_counts, setCount] = useState(0);
	const [expList,setExpList] = useState([]);

	useEffect(()=>{
		console.log('component mounted!')
		listHist();
	},[])

	const navigate = useNavigate();
	const listHist = () => {
		console.log('listHist~');
		//###
		const session_key = cookies.session_key
		const headers = {'Authorization':session_key};
		console.log('#session_key: '+session_key);
		console.log('#headers: '+JSON.stringify(headers));
		axios.get('/history', {headers: headers})
		.then(res => {
			console.log('#resp: '+JSON.stringify(res.data));
			setExpList(res.data.history);
		}).catch(error => {
			console.log('#load error '+error)
		})
	}

	const compare = () => {
		var checks = document.getElementsByName("check");
		var ids = []
		for (var i = 0; i < checks.length; i++){
			//console.log('#check: '+checks[i].checked+','+checks[i].value);
			if (checks[i].checked == true) {
				ids.push(checks[i].value);
			}
		}
		console.log('#ids: '+ids);
		navigate('/compare', {state: {ids:ids}});
	}

	const viewSinglePage = (id) => {
		navigate('/single', {state: {id: [id]}});
	}

	const Count = () => {
		let checks = document.getElementsByName("check");
		let count = 0;
		for (let i = 0; i < checks.length; i++){
			if (checks[i].checked == true) {
				count += 1;
			}
		}
		console.log(count);
		setCount(count);
	}

	//render() =>
	return (
		<div>
			<Menubar page={"history"}/>
			<br/>
			<div className='history-page'>
				<div align="right">
					<button onClick={compare}
						disabled={check_counts > 1 && check_counts < 6 ? false : true}
						title='실험을 2개 이상 5개 이하 선택하세요'>
						compare
					</button>
				</div>
				<div>
					<table className="table" style={{ width: "100%" }}>
						<thead>
							<tr align="center">
								<td width="10%">체크</td>
								<td width="30%">Experiment Name</td>
								<td width="10%">탄소배출량</td>
								<td width="20%">런타임</td>
								<td width="20%">Create Time</td>
							</tr>
						</thead>
						<tbody id="itbody">
							{expList.map(exp => (
								<tr align="center" key={exp.id}>
									<td><input type="checkbox" id="id" name="check" value={exp.id} onClick={()=>{Count()}} /></td>
									<td><a style={{ textDecorationLine: "underline" }} onClick={() => { viewSinglePage(exp.id) }}>{exp.title}</a></td>
									<td>{exp.footprint}</td>
									<td>{exp.run_time}</td>
									<td>{exp.create_time.substr(0, 19)}</td>
								</tr>
							))
							}
						</tbody>
					</table>
				</div>
			</div>
			
		</div>
	)
}

export default History;
