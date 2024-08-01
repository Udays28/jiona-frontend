import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from '../assets/images/20240720_151643_0000.png'; 
import image2 from '../assets/images/20240720_151643_0001.png';
import image3 from '../assets/images/20240720_151644_0010.png';
import image4 from '../assets/images/20240720_161043_0000.png';
import image5 from '../assets/images/20240720_161043_0002.png';
import image6 from '../assets/images/20240720_161043_0008.png';
import image7 from '../assets/images/20240720_161043_0010.png';



const ImageSlider: React.FC = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000, // 2 seconds
      pauseOnHover: true
    };
  

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div><img src={image1} alt="Slide 1" /></div>
        <div><img src={image2} alt="Slide 1" /></div>
        <div><img src={image3} alt="Slide 1" /></div>
        <div><img src={image4} alt="Slide 1" /></div>
        <div><img src={image5} alt="Slide 1" /></div>
        <div><img src={image6} alt="Slide 1" /></div>
        <div><img src={image7} alt="Slide 1" /></div>



      </Slider>
    </div>
  );
};

export default ImageSlider;
