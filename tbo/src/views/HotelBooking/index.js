import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaWifi, FaParking, FaConciergeBell, FaTv, FaBed, FaTaxi, FaClipboardList, FaShower, FaTshirt } from "react-icons/fa"; // Using react-icons for icons
import Header from "../Header";
import PhotoGallery from "../PhotoGallery/PhotoGallery";
import HotelModal from "../HotelModal";
import "../../index.css"

const HotelBooking = ({hotelDetails}) => {
    const cityName = "naya raipur";
    // get env variables
    const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;
    

    useEffect(() => {
        const loadGoogleMaps = () => {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);

            script.onload = () => fetchCoordinates(cityName);
        };

        const fetchCoordinates = (city) => {
            const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyD893pjdDWDuClsXhwqohh9kQQFLvDjC40`;

            fetch(geocodeURL)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === "OK" && data.results.length > 0) {
                        const { lat, lng } = data.results[0].geometry.location;
                        initMap(lat, lng);
                    } else {
                        console.error("Geocoding failed: ", data.status);
                    }
                })
                .catch((error) => console.error("Error fetching geocode data:", error));
        };

        const initMap = (lat, lng) => {
            new window.google.maps.Map(document.getElementById("map"), {
                center: { lat, lng },
                zoom: 12,
            });
        };

        loadGoogleMaps();
    }, []);

    const handleReservation = () => {
        alert("Reservation Successful! Thank you for choosing our hotel.");
    };

    const features = "electric_kettle, parking, room_service, wardrobe, tv, dry_cleaning, restaurant, wifi, heating, cctv, desk, car_hire, ironing";
    const featureList = features.split(",").map((feature) => feature.trim());

    const featureIcons = {
        electric_kettle: <FaBed />,
        parking: <FaParking />,
        room_service: <FaConciergeBell />,
        wardrobe: <FaClipboardList />,
        tv: <FaTv />,
        dry_cleaning: <FaTshirt />,
        restaurant: <FaConciergeBell />,
        wifi: <FaWifi />,
        heating: <FaShower />,
        cctv: <FaShower />,
        desk: <FaClipboardList />,
        car_hire: <FaTaxi />,
        ironing: <FaTshirt />,
    };

    const surroundings = "restaurant-5m, shopping_mall-12m, park, metro_station, hospital, gym, spa, pharmacy, atm, bus_station";

    const surroundingsList = surroundings.split(",").map((surrounding) => surrounding.trim());



    return (
        <div>
            <Header />

            {/* Main Content */}
            <div className="mx-[5%] mt-4">
                <div className="absolute top-[15%] left-[-5%] -z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" 
                        viewBox="-25 -25 250 250" class="floatii"> 
                        <defs>
                        <linearGradient id="lgrad" x1="100%" y1="100%" x2="0%" y2="0%" >
                            <stop offset="0%" style={{stopColor:"#ff8e52",stopOpacity:"1.00"}}/>
                            <stop offset="100%" style={{stopColor:"#f5b89e",stopOpacity:"1.00"}} />
                        </linearGradient>
                        </defs>
                        <path d="M146.4193594737912 11.426623266113694 C110.8157758039957 -4.918742343197543 2.405828334926875 35.812301242615064 3.180326297348472 74.98099154418612 C4.161068214662443 124.58005866752785 151.05454189301233 181.77124597337198 187.60265769309865 148.2262829285628 C213.91565698900527 124.07541852265567 178.87823973988293 26.328276710292805 146.4193594737912 11.426623266113694Z" stroke="none" fill="url(#lgrad)"  />
                    </svg>
                </div>
                <div className="absolute top-[70%] right-[0%] -z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" 
                        viewBox="-25 -25 250 250" class="floatii"> 
                        <defs>
                        <linearGradient id="lgrad" x1="100%" y1="100%" x2="0%" y2="0%" >
                            <stop offset="0%" style={{stopColor:"#ff8e52",stopOpacity:"1.00"}}/>
                            <stop offset="100%" style={{stopColor:"#f5b89e",stopOpacity:"1.00"}} />
                        </linearGradient>
                        </defs>
                        <path d="M146.4193594737912 11.426623266113694 C110.8157758039957 -4.918742343197543 2.405828334926875 35.812301242615064 3.180326297348472 74.98099154418612 C4.161068214662443 124.58005866752785 151.05454189301233 181.77124597337198 187.60265769309865 148.2262829285628 C213.91565698900527 124.07541852265567 178.87823973988293 26.328276710292805 146.4193594737912 11.426623266113694Z" stroke="none" fill="url(#lgrad)"  />
                    </svg>
                </div>
                <div className="flex flex-row items-start justify-around">
                    {/* Left Section - Photo Gallery, Description, Map */}
                    <div className="flex-col flex  gap-[10px] float-start w-[55%]">
                        <PhotoGallery />

                        <section className="bg-transparent p-2 rounded-[10px] mt-1 ">
                            <p>
                                Experience luxury and comfort at our hotel, where you can enjoy
                                top-tier services and a relaxing ambiance. Our rooms are
                                designed to provide maximum comfort, with stunning city views
                                and modern amenities. We offer 24-hour front desk service,
                                airport transfers, and free WiFi throughout the property.
                            </p>
                        </section>

                        <section className="bg-tranparent p-2 rounded-[10px] mt-5">
                            <h4>Location</h4>
                            <div id="map" style={{ width: "100%", height: "250px", borderRadius: "10px" }}></div>
                        </section>

                        <section className="features-section card p-3 m-4">
                            <h4 className="mb-3">🏨 Hotel Features</h4>
                            <div className="row">
                                {featureList.map((feature, index) => (
                                    <div key={index} className="col-md-6 mb-2 d-flex align-items-center">
                                        <span className="me-2">{featureIcons[feature]}</span>
                                        {feature.replace(/_/g, " ").toUpperCase()}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right flex flex-col gap-[10px] - Reviews, Property Highlights */}
                    <div className="flex flex-col gap-[10px] w-[30%] float-end">
                        <section className="bg-white p-3 rounded-[10px] mt-[35%]" style={{boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"}}>
                            <h4>Guest Reviews</h4>
                            <p>
                                <strong>Amortika (India)</strong> ⭐⭐⭐⭐⭐
                            </p>
                            <p>
                                "This hotel is a beacon of sophistication and style. The rooms
                                are spacious, with impeccable furnishings and an ambiance that
                                ensures relaxation."
                            </p>
                            <p>
                                <strong>Staff Rating:</strong> 9.0
                            </p>
                        </section>

                        <section className="bg-white p-5 rounded-[10px] mt-5" style={{boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"}}>
                            <h4>Property Highlights</h4>
                            <p>📍 <strong>Top location:</strong> Highly rated by recent guests (8.0)</p>
                            <p>🍽 <strong>Breakfast info:</strong> Continental, Buffet</p>
                            <button className="btn btn-primary w-100" onClick={handleReservation}>
                                Reserve
                            </button>
                        </section>
                        <section className="surroundings-section card p-3 mt-4">
                            <h4 className="mb-3">🌆 Nearby Attractions</h4>
                            <ul className="list-group">
                                {surroundingsList.map((surrounding, index) => (
                                    <li key={index} className="list-group-item border-0">
                                        {surrounding.replace(/_/g, " ").toUpperCase()}
                                    </li>
                                ))}
                            </ul>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelBooking;
