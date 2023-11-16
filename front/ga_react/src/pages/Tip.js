import React from 'react';
import { Component } from 'react';
import Menubar from '../components/Menubar';
import { useParams } from 'react-router-dom';
import './Tip.css'

function Tip() {
  let { idx } = useParams();
  console.log(idx);
  return (
    <div className='each-tip-page'>
      <Menubar page={"tip"}/>
      <div className='container'>
        <p className='title'>Title</p>
        <p className='content'>
          <br />
          s mission is to make design accessible to everyone. Our two products help people from different
          backgrounds and roles express their ideas visually and make things together.
          <br />
          Figma design is for people to create, share, and test designs for websites, mobile apps, and other digital
          products and experiences. It is a popular tool for designers, product managers, writers and developers and helps
          anyone involved in the design process contribute, give feedback, and make better decisions, faster.
          <br />
          FigJam lets you create online whiteboards where anyone can take part. People often use FigJam for meetings,
          brainstorms, diagrams, planning, and research. In FigJam, you can use text, shapes, drawings, images, sticky
          notes, and other elements to visually represent ideas and jam on work together.
          <br />
          You can create a free account and use both Figma design and FigJam for as long as you like.
          <br />
          What is the difference between Figma design and FigJam?
          <br />
          Figma design and FigJam are two products that, when used together, support your entire design process. While you
          might begin brainstorming and sketching your ideas in FigJam, when youre ready to start designing and then
          prototyping, youd likely move over to Figma design.
          <br />
          Working in Figma design files and FigJam files looks very different. Thats because these environments have
        </p>
      </div>
    </div>
  );
}

export default Tip;