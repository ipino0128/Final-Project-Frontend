import React from "react";
import { Carousel } from "react-responsive-carousel";

export default () => (
  <Carousel autoPlay={true} interval={3000} showThumbs={false} infiniteLoop={true} centerMode={true} centerSlidePercentage={100}>
    <div className="caro">
      <img src="https://assets.pcmag.com/media/images/535006-language-learning-software.jpg?thumb=y&width=810&height=456" />
      <p className="legend">WANT TO LEARN A NEW LANGUAGE?</p>
    </div>
    <div className="caro">
      <img src="https://www.psychologicalscience.org/redesign/wp-content/uploads/2017/08/GettyImages-517493940-Converted-609x419.png" />
      <p className="legend">GET EXCITED</p>
    </div>
    <div className="caro">
      <img src="http://edtechreview.in/images/best-language-learning-apps.jpg" />
      <p className="legend">YEAH</p>
    </div>
    <div className="caro">
      <img src="https://lowdown.carphonewarehouse.com/Common/Helper/DownloadImage.Ashx?ImageId=326429&ImageSize=Medium&Key=a1df379f70df32054a4e4813d0fd8310efbba5ef" />
      <p className="legend">WOO</p>
    </div>
  </Carousel>
);
