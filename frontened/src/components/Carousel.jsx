import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

const CarouselComponent = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel-container">
      <Carousel
        fade
        interval={2500}
        activeIndex={index}
        onSelect={handleSelect}
      >
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://images.pexels.com/photos/3222575/pexels-photo-3222575.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Water Pollution"
          />
          <Carousel.Caption>
            <h4>Water Pollution</h4>
            <p>Protect water resources for a cleaner environment.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://tse2.mm.bing.net/th?id=OIP.pNBi4sZETREhGRZkm43WSgHaE8&pid=Api&P=0&h=220"
            alt="Road Restoration"
          />
          <Carousel.Caption>
            <h4>Road Restoration</h4>
            <p>Better roads for a smoother journey.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://tse3.mm.bing.net/th?id=OIP.oPZBlD_QxAVgB7H8_0rLgQHaEK&pid=Api&P=0&h=220"
            alt="Electricity"
          />
          <Carousel.Caption>
            <h4>Electricity</h4>
            <p>Powering the future with sustainable energy.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <style>{`
        .carousel-container {
          height: 65vh;
          overflow: hidden;
          position: relative;
        }
        .carousel-image {
          height: 60vh;
          width: 100%;
          object-fit: cover;
        }
        @media (max-width: 768px) {
          .carousel-container {
            height: 50vh;
          }
          .carousel-image {
            height: 45vh;
          }
        }
      `}</style>
    </div>
  );
};

export default CarouselComponent;
