import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// If you've placed images/reviews in a separate file, import them:
// import { images, reviews } from './hotelData';

const HotelModal = ({ }) => {
  // Example data defined inline — replace with your real data or imported data
  const images = [
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/433535494.jpg?k=2e164dcb5ed992b90e1d1fb338626e9478c23c1c03b81972293b868142942fd3&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1280x900/283035853.jpg?k=590cb2c2f3d5fc1e2a2bbf6fb82327285b89848d598009bfcfdba537a459dfe7&o=&hp=1',
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
  ];
  //Generate random numbers between 0 and 10 (double)
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  const featureRatings = [
    {
      feature: 'Cleanliness',
      rating: getRandomArbitrary(8, 10)
    },
    {
      feature: 'Location',
      rating: getRandomArbitrary(5, 10)
    },
    {
      feature: 'Facilities',
      rating: getRandomArbitrary(6, 10)
    },
    {
      feature: 'Staff',
      rating: getRandomArbitrary(3, 7)
    },
    {
      feature: 'Value for Money',
      rating: getRandomArbitrary(4, 10)
    },
    {
      feature: 'Comfort',
      rating: getRandomArbitrary(8, 10)
    },
  ]

  const reviews = [
    {
      text: 'We loved the two big rooms, the sauna, the swimming in the sea and the host',
      user: 'Matti',
      country: 'Finland',
    },
    {
      text: 'Comfortable room, very good breakfast and very nice sauna',
      user: 'A',
      country: 'United Kingdom',
    },
    {
      text: 'Beautiful house! The place is very quiet, in nature. Good breakfast and plenty of food. Room for three big people. Host was nice and gave us some tips.',
      user: 'Morena',
      country: 'Italy',
    },
    {
      text: 'We loved the two big rooms, the sauna, the swimming in the sea and the host',
      user: 'Matti',
      country: 'Finland',
    },

  ];

  return (
    <div className="flex h-full">
      {/* Left Pane: Images */}
      <div className="w-full md:w-2/3 h-full overflow-y-auto p-4">
        {/* Header (optional) */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Gyttja Västergårds</h1>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Book now
          </button>
        </div>

        {/* Image Grid */}
        {/* <div className="flex flex-wrap justify-center overflow-hidden">
          {images.map((src, index) => (
            <div key={index} className="w-[30%]">
              <img
                src={src}
                alt={`Hotel Preview ${index + 1}`}
                className="cover rounded shadow "
              />
            </div>
          ))}
          </div> */}
          <div className="grid grid-cols-3 gap-2">
            {images.slice(0, 12).map((src, index) => (
              <div key={index} className="w-full aspect-[4/3]">
                <img
                  src={src}
                  alt={`Hotel Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded shadow"
                />
              </div>
            ))}
          </div>
      </div>

        {/* Right Pane: Reviews */}
        <div className="w-full md:w-1/3 h-full border-l border-gray-200 overflow-y-auto p-4">
          {/* Rating & Review Count */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-blue-500 text-white text-lg font-semibold px-3 py-1 rounded-full">
              9.2
            </div>
            <div>
              <p className="text-lg font-semibold">Great</p>
              <p className="text-sm text-gray-500">122 reviews</p>
            </div>
          </div>

          <h2 className="text-lg font-bold mb-2">
            Things guests who have stayed here like
          </h2>

          {/* Reviews List */}
          {reviews.map((review, index) => (
            <div
              key={index}
              className="mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
            >
              <p className="italic mb-2">“ {review.text} ”</p>
              <p className="text-sm text-gray-600 mb-1">
                Translated byBooking.com -{' '}
                <span className="text-blue-500 ml-1 cursor-pointer">
                  Show original
                </span>
              </p>
              <p className="text-sm text-gray-700">
                {review.user} • {review.country}
              </p>
            </div>
          ))}
          <div>
            Ratings:
          </div>
          {
            featureRatings.map((feature, index) => (
              <>
                <div key={index} className="flex items-start justify-between gap-2 mb-2 w-[50%]">
                  <div className='flex items-center'>

                    <span className='mr-2'>{feature.feature}</span>
                    {feature.rating > 8 && <svg xmlns="http://www.w3.org/2000/svg" width={'16px'} height={'16px'} fill='#008000' viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" /></svg>}
                  </div>
                  <span>{feature.rating.toFixed(1)}</span>
                </div>
                <Box sx={{ width: '50%' }} >
                  <LinearProgress variant="determinate" value={feature.rating * 10} color={`${feature.rating > 8 ? "success" : feature.rating < 5 ? "secondary" : 'inherit'}`} sx={{ height: "8px", borderRadius: "9999px" }} />
                </Box>
              </>
            ))
          }
        </div>
      </div>
      );
};
      export default HotelModal;
