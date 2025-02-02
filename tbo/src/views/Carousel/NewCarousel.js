import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const Carousel2 = ({
    images = [
        {
            url: "https://cdn.sanity.io/images/ocl5w36p/prod2/d9a2d0bdf31d9559bc36d424a81b82b67f7259a2-5504x7040.jpg?w=768&fm=webp&dpr=2",
            caption: "Picture 1"
        },
        {
            url: "https://cdn.sanity.io/images/ocl5w36p/prod2/dd8e930de51c7b3749f06320e442c17c42fc4f0d-5760x3840.jpg?w=768&fm=webp&dpr=2",
            caption: "Picture 2"
        },
        {
            url: "https://cdn.sanity.io/images/ocl5w36p/prod2/97d48cb47f7e1233c2cb27f5fa9dfc7172c22380-5760x3840.jpg?w=768&fm=webp&dpr=2",
            caption: "Picture 3"
        },
        {
            url: "https://cdn.sanity.io/images/ocl5w36p/prod2/88f589274709839dd39710e3e97bdd95a9bd3ae3-5760x3840.jpg?w=768&fm=webp&dpr=2",
            caption: "Picture 4"
        },
        {
            url: "https://cdn.sanity.io/images/ocl5w36p/prod2/8fc4b81b6aa74e43d05a6e65aef092483fe808b6-4856x3640.jpg?w=768&fm=webp&dpr=2",
            caption: "Picture 5"
        },
    ],
    width = "600px",
    height = "400px",
    autoPlayInterval = 4000
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const [progress, setProgress] = useState(0);
    const startTimeRef = useRef(Date.now());

    // Auto-play effect
    // useEffect(() => {
    //   let timer;
    //   if (isPlaying && images.length > 1) {
    //     timer = setInterval(() => {
    //       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    //     }, autoPlayInterval);
    //   }
    //   return () => {
    //     if (timer) clearInterval(timer);
    //   };
    // }, [isPlaying, images, autoPlayInterval]);

    // Change slide automatically at the given interval
    useEffect(() => {
        let timer;
        if (isPlaying && images.length > 1) {
            timer = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, autoPlayInterval);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isPlaying, images, autoPlayInterval]);

    // Update progress bar
    useEffect(() => {
        // Whenever the current index changes, reset progress to 0 and set a new start time
        setProgress(0);
        startTimeRef.current = Date.now();
    }, [currentIndex]);

    useEffect(() => {
        if (!isPlaying) return;

        // We update progress more frequently than autoPlayInterval
        // so that the bar moves smoothly. Adjust the interval time as needed.
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            const percentage = (elapsed / autoPlayInterval) * 100;

            if (percentage >= 100) {
                // Cap at 100; it will reset once the new slide appears
                setProgress(100);
            } else {
                setProgress(percentage);
            }
        }, 25); // update every 25ms for a fairly smooth animation

        return () => clearInterval(interval);
    }, [isPlaying, autoPlayInterval]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // Toggle play/pause on image click
    const handleImageClick = () => {
        setIsPlaying((prev) => !prev);
    };

    if (!images || images.length === 0) {
        return <div style={{ width, height, background: "#ccc" }}>No Images Available</div>;
    }

    return (
        <div
            style={{
                width,
                height,
                position: "relative",
                overflow: "hidden",
                margin: "0 auto",
                border: "1px solid #ddd",
                borderRadius: "8px"
            }}
        >
            {/* === Progress Bar at the top === */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    backgroundColor: "rgba(255,255,255,0.7)",
                    zIndex: 2
                }}
            >
                <div
                    style={{
                        width: `${progress}%`,
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.7)",
                        transition: "width 0.1s linear"
                    }}
                />
            </div>

            {/* Display the current image */}
            <img
                src={images[currentIndex].url}
                alt={`Slide ${currentIndex}`}
                onClick={handleImageClick}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                    userSelect: "none"
                }}
            />

            {/* Left Chevron */}
            <button
                onClick={handlePrev}
                style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: "10px",
                    background: "rgba(255,255,255,0.7)",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <ChevronLeftIcon />
            </button>

            {/* Right Chevron */}
            <button
                onClick={handleNext}
                style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    right: "10px",
                    background: "rgba(255,255,255,0.7)",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <ChevronRightIcon />
            </button>

            {/* Caption (if provided) */}
            {images[currentIndex].caption && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        color: "#fff",
                        padding: "10px",
                        textAlign: "center",
                        fontSize: "16px"
                    }}
                >
                    {images[currentIndex].caption}
                </div>
            )}
        </div>
    );
};

export default Carousel2;
