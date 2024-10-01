"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import dynamic from 'next/dynamic';
import { videos } from "./videos";

const ReactPlayer = dynamic(() => import("react-player"), {ssr: false});

const Slider = () => {
    const sliderRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, []);

    useEffect(() => {
        if (isClient && sliderRef.current) {
            initializeCards();
        }
    }, [isClient, sliderRef]);

    const initializeCards = () => {
        const cards = Array.from(sliderRef.current.querySelectorAll(".card"));
        gsap.to(cards, {
            y: (i) => 0 + 20 * i + "%",
            z: (i) => 15 * i,
            duration: 1,
            ease: "power3.out",
            stagger: -0.1,
        });
    };

    const handleClick = (event) => {
        if (isAnimating) return;
        setIsAnimating(true);

        const slider = sliderRef.current;
        const cards = Array.from(slider.querySelectorAll(".card"));
        const lastCard = cards.pop();
        const firstCard = cards.shift();

        if (event.deltaY > 0) {
            gsap.to(lastCard, {
                y: "+=150%",
                duration: 0.75,
                ease: "power3.inOut",
                onStart: () => {
                    setTimeout(() => {
                        slider.prepend(lastCard);
                        initializeCards();
                        setTimeout(() => {
                        setIsAnimating(false);
                        }, 1000);
                    }, 300);
                },
            });
        }

        else {
            gsap.to(firstCard, {
                y: "-=150%", // Move the card upwards
                duration: 0.75,
                ease: "power3.inOut",
                onStart: () => {
                    setTimeout(() => {
                        slider.append(firstCard); // Move first card to the end
                        initializeCards();
                        setTimeout(() => {
                            setIsAnimating(false);
                        }, 1000);
                    }, 300);
                },
            });
        }
    };
    
    //scroll and drag setup
    let currentScrollPosition = 0;
    let lastScrollY = 0;
    let smoothScrollY = 0;

    //scrolling animations

    const onWheelScroll = (event) => {
        currentScrollPosition -= event.deltaY;
    }

    //dragging animation
    let newX = 0;
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    const onDragStart = (event) => {
        startY = event.clientY || event.touches[0].clientY;
        isDragging = true;
    }

    const onDragMove = (event) => {
        if (!isDragging) return;
        currentY = event.clientY || event.touches[0].clientY;
        currentScrollPosition += (currentY - startY) * 3;
        startY = currentY;
    };

    const onDragEnd = () => {
        isDragging = false;
    }   

  return (
    <>
        <div className="container">
            <div className="slider" ref={sliderRef}>
                {videos.map((video) => (
                    <div className="card" onWheel={handleClick} key={video.id}>
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
                        <div className="video-player">
                            <ReactPlayer 
                                url={`https://vimeo.com/${video.id}`}
                                controls={false}
                                autoPlay={true}
                                loop={true}
                                playing
                                muted
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  );
};

export default Slider;