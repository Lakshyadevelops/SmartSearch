import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useEffect } from "react";
import { getHotelDetails } from "../../services/HotelApi";

const HotelCard = ({ hotel }) => {
    console.log(hotel);
    const [hotelData, setHotelData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);



    const images =
    hotelData &&
    hotelData.HotelDetails &&
    hotelData.HotelDetails.length > 0 &&
    hotelData.HotelDetails[0].Images
      ? hotelData.HotelDetails[0].Images
      : [];

  // State to track the current image index
  const [currentImage, setCurrentImage] = useState(0);



    const fetchHotelData = async () => {
        setLoading(true);
        setError(null);
        
        try {
          // Add your specific API parameters here
          const params =  {
            "Hotelcodes": hotel,  // You can update or pass multiple codes as needed
            "Language": "EN"
          };
          
          const data = await getHotelDetails(params);
          setHotelData(data);
        } catch (err) {
          setError('Failed to fetch hotel details. Please try again later.');
          console.error('Error details:', err);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchHotelData();
      }, []);
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>{error}</div>;
      if (!hotelData) return <div>No hotel data available</div>;
      const {
        HotelName,
        CityName,
        HotelRating,
    } = hotelData.HotelDetails[0];

      // Function to go to the next image (wraps around)
  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  // Function to go to the previous image (wraps around)
  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImage((prevIndex) =>
        (prevIndex - 1 + images.length) % images.length
      );
    }
  };
    console.log('hotel images', hotelData.HotelDetails[0].Images);

    return (
        <div className="flex bg-transparent rounded-lg overflow-hidden w-full relative my-2 justify-center">
            {/* Image Slider */}
            <div className="relative w-1/3">
                <img
                    src={images[currentImage]}
                    alt="Hotel"
                    className="w-full h-48 object-cover"
                />
                <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white"
                    onClick={prevImage}
                >
                    <ChevronLeft size={20} className="opacity-50 hover:opacity-100 transition-opacity duration-200" />
                </button>
                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white"
                    onClick={nextImage}
                >
                    <ChevronRight size={20} className="opacity-50 hover:opacity-100 transition-opacity duration-200" />
                </button>
            </div>

            {/* Hotel Info */}
            <div className="flex-1 p-4 relative">
                {/* Hotel Detail */}
                <div className="flex justify-between items-start">
                    <h2 className="text-lg font-semibold">{HotelName}</h2>
                </div>
                <p className="text-gray-600 text-sm mb-1">{CityName}</p>
                
                {/* Ratinf & Review Count Section */}
                <div className="absolute bottom-4 flex items-center mb-2">
                    <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        {HotelRating}
                    </span>
                    <span className="text-gray-600 text-sm ml-2">{"hih"} reviews</span>
                </div>
                
                {/* Price Section */}
                <div className="absolute bottom-4 right-4 text-right">
                    <p className="text-xl font-bold text-large">₹{2000}</p>
                    <p className="text-gray-500 text-md">₹{1500} total</p>
                    <p className="text-gray-500 text-sm">includes taxes & fees</p>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
