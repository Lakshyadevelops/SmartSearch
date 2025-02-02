import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Card from '../Card/index';

const Slider = ({ heading, hotelList, backgroundUrl }) => {
  const scrollContainerRef = useRef(null);
  const [isAtLeft, setIsAtLeft] = useState(true);
  const [isAtRight, setIsAtRight] = useState(false);

  const updateScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const newIsAtLeft = container.scrollLeft === 0;
      const newIsAtRight = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
      setIsAtLeft(newIsAtLeft);
      setIsAtRight(newIsAtRight);
    }
  };

  useEffect(() => {
    updateScrollPosition();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollContainerRef;
    if (current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };
  const imgurl = `https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg`;


  return (
    <div className={` m-12 p-6 border rounded-[10px]`} style={{background: `url(${backgroundUrl})`}}> {/* Main container box */}
      {/* Heading section */}
      {heading && (
        <div className="mb-6 px-4 text-3xl font-bold text-white">
          {heading}
        </div>
      )}
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md hover:bg-opacity-75 focus:outline-none z-10 transition-opacity duration-200 ${isAtLeft ? 'opacity-0 pointer-events-none' : ''}`}
        >
          <FaChevronLeft />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollPosition}
          className="flex space-x-8 overflow-x-auto scrollbar-hide scroll-smooth outline-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Your Card Components */}
          {hotelList.map((hotel, index) => (
  <Card
    key={index}
    image={hotel.imgurl}
    rating={hotel.rating}
    title={hotel.title}
    price={hotel.price}
    location={hotel.location}
    reviews={hotel.reviews}
    discount={hotel.discount}
  />
))}

          {/* <Card
            image={hotelList[0][imgurl]}
            rating={`8.5`}
            title={`Ama Plantation Trails, Coorg`}
            price={49000}
            location={`Potibella`}
            reviews={`161`}
            discount={5000000}
          />
          <Card
            image={imgurl}
            rating={`8.5`}
            title={`Ama Plantation Trails, Coorg`}
            price={49000}
            location={`Potibella`}
            reviews={`161`}
            discount={5000000}
          />
          <Card
            image={imgurl}
            rating={`8.5`}
            title={`Ama Plantation Trails, Coorg`}
            price={49000}
            location={`Potibella`}
            reviews={`161`}
            discount={5000000}
          />
          <Card
            image={imgurl}
            rating={`8.5`}
            title={`Ama Plantation Trails, Coorg`}
            price={49000}
            location={`Potibella`}
            reviews={`161`}
            discount={5000000}
          />
          <Card
            image={imgurl}
            rating={`8.5`}
            title={`Ama Plantation Trails, Coorg`}
            price={49000}
            location={`Potibella`}
            reviews={`161`}
            discount={5000000}
          />
          <Card
            image={imgurl}
            rating={`8.5`}
            title={`Ama Plantation Trails, Coorg`}
            price={49000}
            location={`Potibella`}
            reviews={`161`}
            discount={5000000}
          />
          <Card
            image={imgurl}
            rating={`8.5`}
            title={`Ama Plantation Trails, Coorg`}
            price={49000}
            location={`Potibella`}
            reviews={`161`}
            discount={5000000}
          /> */}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md hover:bg-opacity-75 focus:outline-none z-10 transition-opacity duration-200 ${isAtRight ? 'opacity-0 pointer-events-none' : ''}`}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Slider;
