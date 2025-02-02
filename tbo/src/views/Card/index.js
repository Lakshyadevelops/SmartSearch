import React from 'react';

const Card = ({ image, title, rating, reviews, price, discount, location,  }) => {
  return (
    <div className="bg-white opacity-90 rounded-xl overflow-hidden min-w-72 w-72 m-4 transform transition duration-300 hover:scale-[1.05]">
      <img className="w-full h-[40%]" src={image} alt={title} />
      <div className="p-4">
        <h3 className="text-xl font-bold text-black">{title}</h3>
        <div className="flex items-center">
          <div className="bg-green-600 rounded-md flex items-center p-1">
            <span className="ml-1 text-black mr-1">{rating}</span>
          </div>
          <span className="ml-2 text-gray-700">({reviews} reviews)</span>
        </div>
        <div className='flex items-center mt-2'>
            <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                width="16px" height="16px" viewBox="0 0 395.71 395.71">
                <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
                    c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
                    C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
                    c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"/>
            </svg>
            <p className="text-gray-700 text-sm mb-0">{location}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
                <svg fill="#000000" width="16px" height="16px" viewBox="-96 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"/></svg>
                <span className="text- gray-900 font-bold text-lg">{price}</span>
            </div>
            <div className='flex items-center'>
                <svg fill="#ff0000" width="16px" height="16px" viewBox="-96 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"/></svg>
                <span className="text-red-500 font-bold line-through">{discount}</span>
            </div>
          {/* Creating a field for description like per night, including taxes and charges */}

        </div>
          <span className="text-gray-00 text-sm w-32 block">per night, including taxes and charges</span>
      </div>
    </div>
  );
};

export default Card;