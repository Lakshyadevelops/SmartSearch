import React, { useState, useEffect } from "react";
import Header from "../Header";
import ChatbotHome from "../ChatbotHome";
import Slider from "../Slider/Slider";
import backgroundHoneymoon from "../../assets/82496.jpeg.jpg";
import backgroundWedding from "../../assets/bg2.jpg";
import backgroundMeeting from "../../assets/82498.jpeg.jpg";
import robot from '../../assets/robot.png'
import UserModal from "../UserVerifyModal";
import { CircularProgress } from "@mui/material";

const HomePage = () => {
    // const imgurl = `https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg`
    const hotelListHoneymoon = [
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/34212263.jpg?k=a577625a372536fd64fc32a304705ac2ff777fb06e76322aeed36a8fb6e82c1e&o=&hp=1`,
            rating: `8.8`,
            title: `Taj Connemara, Chennai`,
            price: 25500,
            location: `Chennai`,
            reviews: `1403`,
            discount: 28050
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/31159700.jpg?k=4304c6dc23baae7c71ce0fef248a32f47725bcde324c177b92db58d2f96e0a93&o=&hp=1`,
            rating: `8.9`,
            title: `The Leela Mumbai`,
            price: 23000,
            location: `Mumbai`,
            reviews: `3921`,
            discount: 25300
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/147320430.jpg?k=5c620824281abe44741f22af3ddd6ce2584d0efa85e867afc792d913040fc643&o=&hp=1`,
            rating: `9.0`,
            title: `The Leela Bhartiya City Bengaluru`,
            price: 21500,
            location: `Bengaluru`,
            reviews: `679`,
            discount: 23650
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/604299990.jpg?k=5e029bb9afe33c2b978fc8ff8c655090eca9b36e03293beb35f98363399230f3&o=&hp=1`,
            rating: `8.8`,
            title: `Trident Nariman Point`,
            price: 19500,
            location: `Mumbai`,
            reviews: `4540`,
            discount: 21450
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/49117797.jpg?k=401f16ce171f28f37fbd88cdff74f2a6528562fcf49c7a6197027a89590be208&o=&hp=1`,
            rating: `8.5`,
            title: `The Oberoi Cecil`,
            price: 19000,
            location: `Shimla`,
            reviews: `413`,
            discount: 20900
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/83171997.jpg?k=e4e004261a309a1cc8799809a09f9077e924530676a9011b6faa41c8f64dda0c&o=&hp=1`,
            rating: `8.6`,
            title: `Feathers- A Radha Hotel, Chennai`,
            price: 18000,
            location: `Chennai`,
            reviews: `338`,
            discount: 19800
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/9073002.jpg?k=14d878984f8c9bc3aaf935a0bfb90c3066fe28154eae4231b5c7101ca9a15e96&o=&hp=1`,
            rating: `7.8`,
            title: `The Lalit Mumbai`,
            price: 15700,
            location: `Mumbai`,
            reviews: `962`,
            discount: 17270
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/16010564.jpg?k=b1896432c0b699e2d6192857909218a498c576e60a382876e610058da146ee6a&o=&hp=1`,
            rating: `8.6`,
            title: `The Oterra`,
            price: 18000,
            location: `Bengaluru`,
            reviews: `286`,
            discount: 19800
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/364558287.jpg?k=4ece48d6ae26710d12503e62f574f4e20124d51f706af8ef5506b66996bdbc33&o=&hp=1`,
            rating: `7.8`,
            title: `Om Vilas Benares, VaranasiOpens in new window`,
            price: 20999,
            location: `Varanasi`,
            reviews: `286`,
            discount: 23098.9
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/638928194.jpg?k=ec1dbee942c3250581cee5d7d92898dba9bce016e02f81d9f0c756dba906b671&o=&hp=1`,
            rating: `8.9`,
            title: `Welcomhotel by ITC Hotels, Tavleen, Chail`,
            price: 16000,
            location: `Himachal Pradesh`,
            reviews: `161`,
            discount: 17600
        },
    ]
    const hotelListWedding = [
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/217990677.jpg?k=99754d98a064ef74e39ea7dec460926f84c2f68426b805c2c63e91f42a020d48&o=&hp=1`,
            rating: `8.6`,
            title: `Green Park Chennai`,
            price: 10349,
            location: `Chennai`,
            reviews: `901`,
            discount: 11383.9
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/635352155.jpg?k=be48c2e4f99aa314500092a9248f7e852dfacf9881ed44256a55ec16210ea20b&o=&hp=1`,
            rating: `9.0`,
            title: `StayVista at Simply Beige with Jacuzzi, Wi-Fi, BBQ`,
            price: 53750,
            location: `Kolkata`,
            reviews: `201`,
            discount: 59125
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/36201997.jpg?k=21ae9f23bc0b040def8c4f917fa9eb87015182290d5753e2800d4a74b78e9df5&o=&hp=1`,
            rating: `9.1`,
            title: `Samode Haveli`,
            price: 35000,
            location: `Jaipur`,
            reviews: `676`,
            discount: 38500
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/142691280.jpg?k=a71fd086865c72117a3c0c04b6ec23551c0bd46322a7d78b8b9b03dd6d3049a8&o=&hp=1`,
            rating: `8.8`,
            title: `Alsisar Haveli - Heritage Hotel`,
            price: 22000,
            location: `Jaipur`,
            reviews: `1044`,
            discount: 24200
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/638954828.jpg?k=5b6f79914cef0a919c68bcfb5a6a6bf6805c4e7fb20b4cba08ff788a7698be71&o=&hp=1`,
            rating: `8.9`,
            title: `Welcomhotel by ITC Hotels, Tavleen, Chail`,
            price: 16000,
            location: `Himachal Pradesh`,
            reviews: `161`,
            discount: 17600
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/166008212.jpg?k=e92de55d43d8c47706fe83e9bf459b93037dd9d3f42b2d8624d689fd0c8fccf8&o=&hp=1`,
            rating: `8.7`,
            title: `Taj Ganges Varanasi`,
            price: 40000,
            location: `Varanasi`,
            reviews: `917`,
            discount: 44000
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/502419122.jpg?k=ec4e0fa204a2a39edfaf24c161df765bc65f7281fbe59d008cf792ec82b9981b&o=&hp=1`,
            rating: `6.9`,
            title: `The Belmonte House By Levelup`,
            price: 9000,
            location: `Udaipur`,
            reviews: `64`,
            discount: 9900
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/481073557.jpg?k=b18361d8c09e699991279611155b44c3ebc43b4be6f3645cc43257c9c82d5049&o=&hp=1`,
            rating: `7.8`,
            title: `Om Vilas Benares, Varanasi`,
            price: 20999,
            location: `Varanasi`,
            reviews: `41`,
            discount: 23098.9
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/17169957.jpg?k=9d953835ba14b346bf5028d4770d51648cdf95e8a58f09f86701581a3463b8b6&o=&hp=1`,
            rating: `8.7`,
            title: `Taj MG Road Bengaluru`,
            price: 16000,
            location: `Bengaluru`,
            reviews: `617`,
            discount: 17600
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/12523175.jpg?k=08dcdfd7b6a7ee3c7982e5564655968ed43b73aa351a92e19956ba6839c5dece&o=&hp=1`,
            rating: `6.8`,
            title: `Hotel Sahara Star`,
            price: 23250,
            location: `Mumbai`,
            reviews: `1560`,
            discount: 25575
        },
    ]
    const hotelListMeeting = [
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/546215346.jpg?k=ca904cd071e575cba7f4c89ce7d3578174b1640a23be4df56051d0d27385fa70&o=&hp=1`,
            rating: `7.6`,
            title: `Hotel Residency Andheri`,
            price: 11111,
            location: `Mumbai`,
            reviews: `457`,
            discount: 12222.1
        },

        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1280x900/233914439.jpg?k=6fc3b8e71297c8e2fe33f9a3008e5e0da5e6758c56a112dd0412d1e38070c8c1&o=&hp=1`,
            rating: `8.3`,
            title: `Holiday Inn Mumbai International Airport, an IHG Hotel`,
            price: 16089,
            location: `Mumbai`,
            reviews: `1580`,
            discount: 17697.9
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1280x900/135130684.jpg?k=1bc68f1ec8af7d239807c33b0e29d23dba207502c18d95eee415adc784a64179&o=&hp=1`,
            rating: `7.8`,
            title: `Ramada Udaipur Resort & Spa`,
            price: 14500,
            location: `Udaipur`,
            reviews: `347`,
            discount: 15950
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/506784258.jpg?k=b4de812c308b8a06affb3c01153989d310b1e74d93302cab264765e6a341edea&o=&hp=1`,
            rating: `8.5`,
            title: `Aurika, Mumbai International Airport`,
            price: 12684,
            location: `Mumbai`,
            reviews: `569`,
            discount: 13952.4
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/447364567.jpg?k=ddb19afbe5ca52ef2a771eee2bb4d3ab1cbb8a0e9afff1edfe6b8bce8a76f15b&o=&hp=1`,
            rating: `8.5`,
            title: `Greenpark Bengaluru`,
            price: 10350,
            location: `Bengaluru`,
            reviews: `293`,
            discount: 11385
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/109130625.jpg?k=746d84b8386a1d3bf0c6d57b9211aafdd8db87324cc2dc4d66ca9b08b99dfaa4&o=&hp=1`,
            rating: `8.0`,
            title: `The Fern - Goregaon`,
            price: 17199,
            location: `Mumbai`,
            reviews: `307`,
            discount: 18918.9
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/139212746.jpg?k=96ed7f5627182fa8fcf1060c0ac5167ee70783185ca7790d033cb6ec776fa54e&o=&hp=1`,
            rating: `8.6`,
            title: `The Oterra`,
            price: 18000,
            location: `Bengaluru`,
            reviews: `286`,
            discount: 19800
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/217989401.jpg?k=71b973dfbd0f5fb7907d943b6a92708bb40d19e39fd9127da1afb98f56199813&o=&hp=1`,
            rating: `8.6`,
            title: `Green Park Chennai`,
            price: 10349,
            location: `Chennai`,
            reviews: `901`,
            discount: 11383.9
        },
        {
            imgurl: `https://cf.bstatic.com/xdata/images/hotel/max1024x768/166008202.jpg?k=c147329c4a516b175fed6c59fbd119154e7bf9621fb5a93daf4647ebcad377d1&o=&hp=1`,
            rating: `8.7`,
            title: `Taj Ganges Varanasi`,
            price: 40000,
            location: `Varanasi`,
            reviews: `917`,
            discount: 44000
        },
    ]
    // user state; if not set, assume user is not logged in.
    const [user, setUser] = useState(null);
    // a loading flag to wait for the login check.
    const [loading, setLoading] = useState(true);

    // When the component mounts, check the user's login status.
    useEffect(() => {
        // Adjust the URL if needed. This endpoint should return user info if logged in,
        // or an error (or empty response) if not.
        fetch("http://127.0.0.1:8000/auth/check", { credentials: "include" })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                // If not OK, assume not logged in.
                throw new Error("Not logged in");
            })
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                // Not logged in
                setUser(null);
                setLoading(false);
            });
    }, []);

    // If still checking login status, show a loading indicator.
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
                <CircularProgress size={100} />
            </div>
        )
    }

    // if screen is not at the top then scroll when <img> robot is clicked
    const handleScroll = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div>
            {!user && <UserModal />}
            <Header />
            <ChatbotHome useWhere={"hpg"}/>
            <img src={robot} alt="robot" className="w-20 fixed bottom-[5%] right-[2%] z-50 cursor-pointer" onClick={handleScroll} />
            <div className="w-fit-content">
               <p className="typewriter max-w-fit font-bold text-4xl ml-[4%] text-gray-500"> Find your Perfect stay to book hotels at best prices !</p>
            </div>

            <Slider heading={"A Fusion of Comfort and Corporate Excellence for Conferences & Meetings!"} hotelList={hotelListMeeting} backgroundUrl={backgroundMeeting} />
            <Slider heading={"Escape to These Dreamy Resorts for the Ultimate Honeymoon Paradise!"} hotelList={hotelListHoneymoon} backgroundUrl={backgroundHoneymoon} />
            <Slider heading={"From Cake to Champagne Palaces that turn Celebrations into Royal Affairs!"} hotelList={hotelListWedding} backgroundUrl={backgroundWedding} />

        </div>
    )
}

export default HomePage;
