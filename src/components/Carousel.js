import React from "react";
import { Carousel } from "react-responsive-carousel";

export default () => (
  <Carousel autoPlay={true} interval={2500} showThumbs={false} infiniteLoop={true} centerMode={true} centerSlidePercentage={100}>

    <div className="caro">
      <img src="https://assets.pcmag.com/media/images/535006-language-learning-software.jpg?thumb=y&width=810&height=456" />

    </div>
    <div className="caro">
      <img src="http://mediad.publicbroadcasting.net/p/vpr/files/styles/x_large/public/201708/Languages-istock-Qvasimodo-20170803.png" />

    </div>

    <div className="caro">
      <img src=" https://financesonline.com/uploads/2018/04/lms.jpg" />

    </div>
    <div className="caro">
      <img src="https://media.edutopia.org/styles/responsive_2880px_original/s3/masters/d7_images/cover_media/cronin-169hero-englishlanglearners-shutterstock-.jpg" />
      
    </div>





  </Carousel>
);
