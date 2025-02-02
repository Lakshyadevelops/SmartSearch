import React, { useState } from 'react';
import HotelModal from '../HotelModal';
import { X } from 'lucide-react';

export default function PhotoGallery({name = "Ama Plantation Trails, Coorg", location = "Gyttjantie 29, 21650 Nauvo, Finland"}) {
  const [isOpen, setIsOpen] = useState(false);

  // Some sample images (replace these with your own)
  const previewImages = [
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',

  ];

  // More images to display inside the modal
  const moreImages = [
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
    // ...etc
  ];

  const handleOpen = () =>{
    setIsOpen(true);
    // Marks the overflow as hidden to avoid scrolling the background
    document.body.style.overflow = 'hidden';
  }
  const handleClose = () => {
    setIsOpen(false);
    // Restores the overflow when the modal is closed
    document.body.style.overflow = 'auto';
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* Preview images in a row */}
      {/* <div className="flex space-x-2">
        {previewImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Preview ${index}`}
            className="w-40 h-28 object-cover rounded shadow"
          />
        ))}
      </div> */}
        <div className="bg-transparent p-2 rounded-[10px]">
            <h4 className='text-xl font-bold text-gray-900'>{name}</h4>
            <div className='flex items-center mt-4 justify-start mb-5'>
            <svg fill="#0000ff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                width="27px" height="27px" viewBox="0 0 395.71 395.71">
                <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
                    c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
                    C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
                    c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"/>
            </svg>
            <p className="text-gray-700 text-md mb-0 ml-5">{location}</p>
        </div>
            <img src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg" className="w-full h-[300px] cover rounded-[10px] mb-2" alt="Hotel" />
            <div className="row">
                {previewImages.map((category, index) => (
                    <div key={index} className="col-4">
                        <img
                            src={`https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg`}
                            className="img-fluid rounded"
                            alt={category}
                        />
                    </div>
                ))}
            </div>
        </div>

      {/* +11 pictures button */}
      <button
        className="text-blue-500 font-semibold"
        onClick={handleOpen}
      >
        +11 pictures
      </button>

      {/* Conditionally render the HotelModal */}
    {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 mt-0">
        <div className="bg-white w-[90%] h-[90%] rounded-lg relative overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-50"
          aria-label="Close modal"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>
        <HotelModal
                onClose={handleClose}
                images={[...moreImages]} />
            
        </div>
    </div>}
    </div>
  );
}
