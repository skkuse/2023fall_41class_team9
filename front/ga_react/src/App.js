import React from 'react'
import {Component} from 'react'

//import { Route,	HashRouter, BrowserRouter, Switch }	from 'react-router-dom'
import { BrowserRouter, Routes, Route }	from 'react-router-dom'

import Home	from './Home'
import History	from './History'
import Board from './pages/Board.js'
import Tip from './pages/Tip.js'
import Menubar from './components/Menubar.js'
import './style.css'

class App extends Component {
	render(){
		return (
			<div style={{height:"100%"}}>
				{/*
				<BrowserRouter>
					<Switch>
						<Route path="/" exact={true} component={GA} />
						<Route path="/ga"  component={GA} />
					</Switch>
				</BrowserRouter>
				*/}
				<BrowserRouter>
					<Routes>
						<Route path="/" exact={true} element={<Menubar/>} />
						<Route path="/home"  element={<Home/>} />
						<Route path="/history"  element={<History/>} />
						<Route path="/tips" exact={true} element={<Board/>}/>
						<Route path='/tips/:idx' exact={true} element={<Tip/>}/>
					</Routes>
				</BrowserRouter>
				
			</div>
		);
	}
}

export default App;
