import './Board.css'
import React from 'react';
import {Component} from 'react'
import Menubar from '../components/Menubar.js'
import { Tip } from '../components/Tip.js';

class Board	extends	Component	{
	constructor() {
		super();
	}
  state =	{
	}
	componentDidMount()	{
		console.log('# component did mount board');
	}
  render() {
    return (
      <div className="tips-page">
        <Menubar />
        <div className='tips-table'>
          <Tip title='example1' contents='example1' idx={0} />
          <Tip title='example2' contents='example2' idx={1} />
          <Tip title='example3' contents='example3' idx={2} />
          <Tip title='example4' contents='example4' idx={3} />
          <Tip title='example5' />
          <Tip title='example' />
          <Tip title='example' />
          <Tip title='example' />
        </div>
      </div>
    );
  }
}

export default Board;