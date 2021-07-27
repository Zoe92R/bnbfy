import { React } from 'react'
import loaderSvg from '../../assets/svg/loader/Infinity-1s-264px.svg'

export const PageLoader = () => {

  return (
    <div className="page-loader flex align-center justify-center">
      <img src={loaderSvg} alt=""/>
    </div>
  )
}