"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import dynamic from 'next/dynamic';
import { videos } from "./videos";
import ShinyButton from "@/components/ui/shiny-button";
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle } from "react-icons/io";
import Menu from "@/components/menu/Menu"; // Import the Menu component
import Image from "next/image";
import Header from "../Header";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Slider = () => {
    const sliderRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu open/close
    const [currentFrontCard, setCurrentFrontCard] = useState(videos.length - 1);  // Track index of front card

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && sliderRef.current) {
            initializeCards();
        }
    }, [isClient, sliderRef]);

    const initializeCards = () => {
        let scaler = 1; //adjust the scale of displayed cards
        if ((videos.length > 4) && (videos.length <= 6)){
            scaler = 0.6;
        }
        else if ((videos.length > 6) && (videos.length <= 8)){
            scaler = 0.4;
        }
        else if ((videos.length > 8) && (videos.length <= 20)){
            scaler = 0.125;
        }
        else {
            scaler = 1;
        }
        const cards = Array.from(sliderRef.current.querySelectorAll(".card"));
        gsap.to(cards, {
            y: (i) => 0 + (20 * scaler) * i + "%",
            z: (i) => (15 * scaler) * i,
            duration: 1,
            ease: "power3.out",
            stagger: -0.1,
        });
    };

    const handleClick = (action) => {
        if (isAnimating) return;
        setIsAnimating(true);

        const slider = sliderRef.current;
        const cards = Array.from(slider.querySelectorAll(".card"));
        const lastCard = cards.pop();
        const firstCard = cards.shift();

        const animateUp = () => {
            gsap.to(lastCard, {
                y: "+=150%",
                duration: 0.75,
                ease: "power3.inOut",
                onStart: () => {
                    setTimeout(() => {
                        slider.prepend(lastCard);
                        initializeCards();
                        setCurrentFrontCard((prev) => (prev === 0 ? videos.length - 1 : prev - 1));  // Update front card index
                        setTimeout(() => {
                            setIsAnimating(false);
                        }, 1000);
                    }, 300);
                },
            });
        };

        const animateDown = () => {
            gsap.to(firstCard, {
                y: "-=150%",  // Match the direction with swipeUp
                duration: 0.75,  // Same duration for consistency
                ease: "power3.inOut",  // Same easing function as swipeUp
                onStart: () => {
                    setTimeout(() => {
                        slider.append(firstCard);  // Move first card to the end as before
                        initializeCards();  // Reinitialize cards
                        setCurrentFrontCard((prev) => (prev === videos.length - 1 ? 0 : prev + 1));  // Update front card index
                        setTimeout(() => {
                            setIsAnimating(false);  // Allow further animations
                        }, 1000);  // Ensure timing matches swipeUp
                    }, 300);
                },
            });
        };

        // Use the action parameter to determine the animation direction
        if (action === "swipeDown") {
            animateDown();
        } else if (action === "swipeUp") {
            animateUp();
        }
    };

    // Mobile functionality
    let touchStartY = 0;

    const handleTouchStart = (event) => {
        touchStartY = event.touches[0].clientY; // Get the initial Y position of the touch
    };

    const handleTouchEnd = (event) => {
        const touchEndY = event.changedTouches[0].clientY; // Get the Y position when the touch ends
        const deltaY = touchStartY - touchEndY; // Calculate the swipe distance

        if (Math.abs(deltaY) > 50) { // Minimum swipe threshold
            if (deltaY < 0) {
                // Swiping up
                handleClick("swipeUp");
            } else {
                // Swiping down
                handleClick("swipeDown");
            }
        }
    };

    // Menu toggle function
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="-mt-12 lg:-mt-20">
            <div className="heading">
                <Header />
            </div>
            {/* <div className="min-h-screen absolute pointer-events-none inset-0 -z-40 h-full opacity-50 -mt-5">
            <ReactPlayer
            url={`https://vimeo.com/1016517215`} 
            controls={false}
            autoPlay={true}
            loop={true}
            playing
            muted
            width="100%"
            height="100%"
            />
            </div> */}
            <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} /> {/* Pass state and function as props */}
            <div className="z-10">
                <div className="container">
                    <div className="slider" ref={sliderRef}>    
                        {videos.map((video, index) => (
                            <div
                                className={`card ${index === currentFrontCard ? "cursor-pointer hover:shadow-lg" : ""}`}
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                                key={video.id}
                                onClick={() => {
                                    if (index === currentFrontCard) {  // Check if the clicked card is the front card
                                        toggleMenu();  // Open menu only if the front card is clicked
                                    }
                                }}
                            >
                                <div className="card-info">
                                    <div className="card-item">
                                        <p>{video.date}</p>
                                    </div>
                                    <div className="card-item">
                                        <p>{video.title}</p>
                                    </div>
                                    <div className="card-item">
                                        <p>{video.category}</p>
                                    </div>
                                </div>
                                <div className="relative overflow-hidden w-full h-full">
                                    <Image
                                    src={`/${video.id}`}
                                    fill={true}
                                    alt="Picture"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                <div>
                    <div className="ml-[1340px] invisible lg:visible flex lg:mt-96">
                        <ShinyButton
                            id="swipeDown"
                            className="m-2 bg-white/40 relative rounded-lg px-5 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out dark:bg-gradient-to-r from-gray-800 to-gray-900 hover:shadow-[0_0_33px_hsl(355,40%,33%)]"
                            onClick={() => handleClick("swipeDown")}
                            >
                            <span className="relative block text-sm uppercase tracking-wide text-gray-300 dark:font-light dark:text-gray-200">
                                <IoIosArrowDropupCircle className="size-14" />
                            </span>
                        </ShinyButton>
                    </div>
                    <div className="ml-[1340px] invisible lg:visible flex lg:mt-5">
                        <ShinyButton
                            id="swipeUp"
                            className="m-2 bg-white/40 relative rounded-lg px-5 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out dark:bg-gradient-to-r from-gray-800 to-gray-900 hover:shadow-[0_0_33px_hsl(355,40%,33%)]"
                            onClick={() => handleClick("swipeUp")}
                            >
                            <span className="relative block text-sm uppercase tracking-wide text-gray-300 dark:font-light dark:text-gray-200">
                                <IoIosArrowDropdownCircle className="size-14" />
                            </span>
                        </ShinyButton>
                    </div>
                </div>
                
                </div>
            </div>
        </div>
    );
};

export default Slider;
