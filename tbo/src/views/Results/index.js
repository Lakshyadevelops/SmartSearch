import React, { useState, useEffect, use } from "react";
import Header from "../Header";
import HotelCard from "../HotelCard";
import ChatbotHome from "../ChatbotHome";
import { Rnd } from "react-rnd";
import robot from "../../assets/robot.png";
import { Minimize2Icon } from "lucide-react";

// const hotels = ['1013903','1016572','1019759','1019773','1027668','1029938']

// const hotels = [
//   {
//     name: "Taj City Centre",
//     city: "Sector 44, Gurugram",
//     rating: 9.9,
//     reviews: 999,
//     price: "17,999",
//     finalPrice: "19,999",
//     images: [
//       "https://cdn.sanity.io/images/ocl5w36p/prod2/d9a2d0bdf31d9559bc36d424a81b82b67f7259a2-5504x7040.jpg?w=768&fm=webp&dpr=2",
//       "https://cdn.sanity.io/images/ocl5w36p/prod2/dd8e930de51c7b3749f06320e442c17c42fc4f0d-5760x3840.jpg?w=768&fm=webp&dpr=2",
//       "https://cdn.sanity.io/images/ocl5w36p/prod2/97d48cb47f7e1233c2cb27f5fa9dfc7172c22380-5760x3840.jpg?w=768&fm=webp&dpr=2",
//       "https://cdn.sanity.io/images/ocl5w36p/prod2/88f589274709839dd39710e3e97bdd95a9bd3ae3-5760x3840.jpg?w=768&fm=webp&dpr=2",
//       "https://cdn.sanity.io/images/ocl5w36p/prod2/8fc4b81b6aa74e43d05a6e65aef092483fe808b6-4856x3640.jpg?w=768&fm=webp&dpr=2"
//     ],
//   },
//   {
//     name: "The Leela",
//     city: "DLF Phase 3, Gurugram",
//     rating: 9.8,
//     reviews: 899,
//     price: "15,999",
//     finalPrice: "17,999",
//     images: [
//       "https://www.theleela.com/prod/content/assets/styles/tl_600_432_webp/public/2024-01/Skydesk.jpg.webp?VersionId=SwDjdyY9vhj3is_tUPPuVJ5XtSSe49Nu&itok=3ecUrjf5",
//       "https://www.theleela.com/prod/content/assets/styles/tl_370_400_webp/public/2021-06/Premier-Room.jpg.webp?VersionId=opvQhWADw6NQ8wUlvAKXkfixV_bfC2Wa&itok=vbbhpMYk",
//       "https://www.theleela.com/prod/content/assets/styles/tl_370_400_webp/public/2021-06/Residence-with-three-bedroom.jpg.webp?VersionId=Wompf03weEQNeMCb7NYaTEDXrUGTBUsK&itok=a_iDIe7a",
//       "https://www.theleela.com/prod/content/assets/styles/tl_600_432_webp/public/2024-01/Golf-course-Gurugram-Hotel.jpg.webp?VersionId=mc_qqKNQqUSehUc05C8pYzgshQLWqnN6&itok=lGnlq827",
//       "https://www.theleela.com/prod/content/assets/styles/tl_840_604_webp/public/2024-01/Golfi-course.jpg.webp?VersionId=lGWd5PsQjRqYNQrka38z1zOohRtG_PFA&itok=05ZKvTev"
//     ],
//   },
//   {
//     name: "The Oberoi",
//     city: "Udyog Vihar, Gurugram",
//     rating: 9.7,
//     reviews: 799,
//     price: "14,999",
//     finalPrice: "16,999",
//     images: [
//       "https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-gurgaon/gallery/featured/gurgaon-gallery-featured-2-arieal-724x407.jpg",
//       "https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-gurgaon/gallery/featured/gurgaon-gallery-featured-3-threesixtyone-alfresco-dining-724x407.jpg",
//       "https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-gurgaon/room-and-suites/room-and-suite-gallery-1448x814/presidential-suite/02-presidential-suite-living-room.jpg",
//       "https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-gurgaon/room-and-suites/room-and-suite-gallery-1448x814/presidential-suite/04-presidential-suite-bedroom.jpg",
//       "https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-gurgaon/destination/detailed/gurgaon-galleria-market.jpg"
//     ],
//   },
//   {
//     name: "The Leela",
//     city: "DLF Phase 3, Gurugram",
//     rating: 9.8,
//     reviews: 899,
//     price: "15,999",
//     finalPrice: "17,999",
//     images: [
//       "https://www.theleela.com/prod/content/assets/styles/tl_600_432_webp/public/2024-01/Skydesk.jpg.webp?VersionId=SwDjdyY9vhj3is_tUPPuVJ5XtSSe49Nu&itok=3ecUrjf5",
//       "https://www.theleela.com/prod/content/assets/styles/tl_370_400_webp/public/2021-06/Premier-Room.jpg.webp?VersionId=opvQhWADw6NQ8wUlvAKXkfixV_bfC2Wa&itok=vbbhpMYk",
//       "https://www.theleela.com/prod/content/assets/styles/tl_370_400_webp/public/2021-06/Residence-with-three-bedroom.jpg.webp?VersionId=Wompf03weEQNeMCb7NYaTEDXrUGTBUsK&itok=a_iDIe7a",
//       "https://www.theleela.com/prod/content/assets/styles/tl_600_432_webp/public/2024-01/Golf-course-Gurugram-Hotel.jpg.webp?VersionId=mc_qqKNQqUSehUc05C8pYzgshQLWqnN6&itok=lGnlq827",
//       "https://www.theleela.com/prod/content/assets/styles/tl_840_604_webp/public/2024-01/Golfi-course.jpg.webp?VersionId=lGWd5PsQjRqYNQrka38z1zOohRtG_PFA&itok=05ZKvTev"
//     ],
//   },
//   {
//     name: "Taj City Centre",
//     city: "Sector 44, Gurugram",
//     rating: 9.9,
//     reviews: 999,
//     price: "17,999",
//     finalPrice: "19,999",
//     images: [
//       "https://cdn.sanity.io/images/ocl5w36p/prod2/d9a2d0bdf31d9559bc36d424a81b82b67f7259a2-5504x7040.jpg?w=768&fm=webp&dpr=2",
//       "https://cdn.sanity.io/images/ocl5w36p/prod2/dd8e930de51c7b3749f06320e442c17c42fc4f0d-5760x3840.jpg?w=768&fm=webp&dpr=2",
//       "https://cdn.sanity.io/images/ocl5w36p/prod2/97d48cb47f7e1233c2cb27f5fa9dfc7172c22380-5760x3840.jpg?w=768&fm=webp&dpr=2",
//       "https://cdn.sanity.io/images/ocl5w36p/prod2/88f589274709839dd39710e3e97bdd95a9bd3ae3-5760x3840.jpg?w=768&fm=webp&dpr=2",
//       "https://cdn.sanity.io/images/ocl5w36p/prod2/8fc4b81b6aa74e43d05a6e65aef092483fe808b6-4856x3640.jpg?w=768&fm=webp&dpr=2"
//     ],
//   },
// ];

const Results = () => {
  // Controls if the modal (chatbot) is rendered.
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  // Controls CSS classes for the open/close animation.
  const [modalVisible, setModalVisible] = useState(false);
  const [hotels, setHotelData] = useState([]);

  // When the robot image is clicked, open the modal.
  const handleImgClick = () => {
    setChatbotOpen(true);
  };

  // When "Minimize" is clicked, animate out then remove the modal.
  const handleMinimize = () => {
    setModalVisible(false);
    // Wait for the animation to finish (300ms) before unmounting the modal.
    setTimeout(() => {
      setChatbotOpen(false);
    }, 300);
  };
  const sessionId = localStorage.getItem("sessionId");
  console.log("sessionId", sessionId);
  // Now write a function for me to fetch http://0.0.0.0:8000/get_hotels?session_id=sessionId
  useEffect(() => {
  const fetchHotels = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/get_hotels?session_id=${sessionId}`);
        const data = await response.json();
        const hotelCodes = data.map(item => item.HotelCode || "");
        setHotelData(hotelCodes);
        console.log("hotelCodes", hotelCodes);
        return data;
    } catch (error) {
        console.error('Error fetching hotels:', error);
        throw error;
    }
    };
    fetchHotels();
    }, []);

  // When the modal mounts, trigger the animation in.
  useEffect(() => {
    if (isChatbotOpen) {
      // Use a short delay to ensure the CSS transition takes effect.
      setTimeout(() => {
        setModalVisible(true);
      }, 10);
    }
  }, [isChatbotOpen]);
  // Calculate default dimensions and position for the modal
  const defaultWidth = window.innerWidth * 0.4;
  const defaultHeight = window.innerHeight * 0.4;
  const defaultX = (window.innerWidth - defaultWidth) / 2;
  const defaultY = (window.innerHeight - defaultHeight) / 2;
  return (
    <div className="bg-transparent">
      <Header />
      <div className="mx-4 p-6 flex justify-center">
        {/* <div className="absolute top-[20%] left-[2%] z-0">
          <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width={"200px"} height={"200px"}>                    <defs>                         <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">                            <stop id="stop1" style={{ stopColor: "rgba(95.695, 139.381, 207.879, 1)", offset: "0%" }}></stop>                            <stop id="stop2" style={{ stopColor: "rgba(165.029, 236.917, 255, 1)", offset: "100%" }}></stop>                        </linearGradient>                    </defs>                <path fill="url(#sw-gradient)" d="M1.8,3.2C-3.4,10,-17.2,13.9,-18.9,9.2C-20.7,4.4,-10.3,-9.1,-3.4,-11.1C3.5,-13.1,6.9,-3.5,1.8,3.2Z" width="100%" height="100%" style={{ transform: "translate(50 50)", transition: "0.3s", strokeWidth: "0" }}></path>              </svg>

        </div> */}
        {/* Left Section for Hotel List */}
        <div className="w-3/4 h-screen">
          {hotels.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))}
        </div>

        <img src={robot} alt="robot" className={`w-20 fixed bottom-[5%] right-[2%] z-50 cursor-pointer ${isChatbotOpen === true ? "hidden" : ""}`} onClick={handleImgClick} />


        {isChatbotOpen && (
          <Rnd
            default={{
              x: window.innerWidth / 2 + 75,
              y: window.innerHeight / 2 - 180,
              width: defaultWidth,
            }}
            minWidth={500}
            bounds="window"
          >
            <div
              className={`bg-white shadow-lg border border-gray-300 transition-all duration-300 rounded-xl
                ${modalVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {/* Modal Header */}
              <div className="bg-white text-white p-2 flex justify-between items-center cursor-move rounded-t-xl">
                <span></span>
                <button
                  onClick={handleMinimize}
                  className="text-gray-500 px-2 py-1 rounded"
                >
                  <Minimize2Icon/>
                </button>
              </div>
              {/* Chatbot Content */}
              <div className="p-4">
                <ChatbotHome useWhere={"res"}/>
              </div>
            </div>
          </Rnd>
        )}

        {/* Right Section for Additional Component */}
        {/* <div className="w-1/2 p-2 h-screen sticky top-0"> */}
        {/* Add your other component here */}
        {/* <ChatbotHome /> */}
        {/* <div className="bg-gray-100 shadow-md rounded p-4">
                        <h2 className="text-xl font-semibold mb-4">ChatBox Component</h2>
                        <p>Chat Messages Here...</p>
                    </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Results;
