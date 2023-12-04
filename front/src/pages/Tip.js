import React from 'react';
import { useParams } from 'react-router-dom';
import Menubar from '../components/Menubar';
import tipData from './tips.json'
import './Tip.css'

function Tip() {
  let { idx } = useParams();
  return (
    <div className='each-tip-page'>
      <Menubar page={"tip"}/>
      <div className='container'>
        <p className='title'>{tipData[idx]['title']}</p>
        <p className='content'>{tipData[idx]['contents'][0]}</p>
        <div className='subsection'>
          <img className='image' src={`/img/tip_images/before_test${+idx+1}.png`}/>
          <img className='image' src={`/img/tip_images/after_test${+idx+1}.png`}/>
        </div>
        <p className='content'>{tipData[idx]['contents'][1]}</p>
      </div>
    </div>
  );
}

export default Tip;