import React, { Component } from 'react'
import loaderSvg from '../../assets/svg/loader/Infinity-1s-264px.svg'
export class PageLoader extends Component {
  render() {
    return (
      <div style={{ minHeight:'700px',width:'100%',}}><img src={loaderSvg} style={{ width: '250px',position:'absolute',left:'40%' }}></img></div>
    )
  }
}