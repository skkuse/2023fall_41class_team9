import React from 'react'
import {Component} from 'react'
import { BrowserRouter, Routes, Route }	from 'react-router-dom'
import {CookiesProvider} from 'react-cookie'

import Home	from './Home'
import Menubar from './Menubar'
import History	from './History'
import Board from './pages/Board.js'
import Tip from './pages/Tip.js'
import Root from './pages/Root.js'
import Compare	from './Compare'
import SingleExp from './pages/SingleExp.js'

import './style.css'

class App extends Component {
	render(){
		return (
			<div style={{height:"100%"}}>
				<CookiesProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" exact={true} element={<Root />} />
							<Route path="/home" element={<Home />} />
							<Route path="/history" element={<History />} />
							<Route path="/tips" exact={true} element={<Board />} />
							<Route path='/tips/:idx' exact={true} element={<Tip />} />
							<Route path="/compare" element={<Compare />} />
							<Route path="/single" exact={true} element={<SingleExp />}/>
						</Routes>
					</BrowserRouter>
				</CookiesProvider>
			</div>
		);
	}
}

export default App;
