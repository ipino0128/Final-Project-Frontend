import React from 'react'
import Carousel from "./Carousel";
import About from "./About"
import Logo from './Logo'
import "react-responsive-carousel/lib/styles/carousel.min.css"



const Welcome = () => {


  return(
<div className="Welcome">
<Logo/>
<Carousel/>
<About/>
    </div>
  )
}

export default Welcome
