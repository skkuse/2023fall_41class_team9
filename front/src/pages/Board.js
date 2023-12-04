import './Board.css'
import React from 'react';
import {Component} from 'react'
import Menubar from '../components/Menubar.js'
import Tip from '../components/TipBox.js';
import tipData from './tips.json'

class Board	extends	Component	{
	componentDidMount()	{
		console.log('# component did mount board');
	}
  render() {
    return (
      <div className="tips-page">
        <Menubar page={"tips"}/>
        <div className='tips-table'>
          {tipData.map(element => {
            return <Tip key={element.idx} title={element.title} contents={element.contents[0]} idx={element.idx} />
          })};
        </div>
      </div>
    );
  }
}

export default Board;