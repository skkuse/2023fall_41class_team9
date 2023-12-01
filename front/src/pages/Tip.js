import React from 'react';
import { Component } from 'react';
import Menubar from '../components/Menubar';
import { useParams } from 'react-router-dom';
import './Tip.css'
import tipData from './tiptest.json'

function Tip() {
  let { idx } = useParams();
  console.log(idx);
  console.log(tipData);
  return (
    <div className='each-tip-page'>
      <Menubar page={"tip"}/>
      <div className='container'>
        <p className='title'>{tipData[idx]['title']}</p>
        <p className='content'>{tipData[idx]['contents'][0]}</p>
        <div className='subsection'>
          <img className='image'></img>
          <img className='image'></img>
        </div>
        <p className='content'>{tipData[idx]['contents'][1]}</p>
      </div>
    </div>
  );
}

export default Tip;