"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./menu.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Heading from "../Heading";
import Bounded from "../Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/lab", label: "Lab" },
];

const Menu = ({ isMenuOpen, toggleMenu }) => { // Accept props
  const container = useRef();
  const tl = useRef();

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 75 });
      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: -0.75,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  return (
      <div className="menu-container" ref={container}>

      {/* menu-overlay */}
      <div className="menu-overlay">
        {/* menu-overlay-bar */}
        <div className="menu-overlay-bar">
          <div className="menu-close">
            <Heading as="h1" size="sm"><span onClick={toggleMenu} className="cursor-pointer">Virtual Tour</span></Heading>
          </div>
          <div className="menu-close">
            <Heading as="h1" size="sm"><span onClick={toggleMenu} className="cursor-pointer">Close</span></Heading>
          </div>
        </div>
        
        {/* start blog article here */}
        <div className="mt-28 lg:ml-12 xl:mb-5 text-center">
        <Heading as="h1" className="">blog.data.title</Heading>

        <div className="mt-8 text-xl font-medium">
          blog.data.date
        </div>

        <Bounded as="article">
        <div className="rounded-2xl border-2 border-slate-300 bg-[#72383D] bg-opacity-50 -mx-8 py-5 lg:px-2 lg:py-10">
        <div className="prose prose-lg prose-invert w-full max-w-none text-left">
          <div className="mx-14 xl:mx-28"> 
            {/* key={index} :: ^here*/}
              <Image src={`/image1.jpg`} width={800} height={800} className="relative overflow-hidden text-center" />
              <Heading size="xs" className="mt-20">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Pretium varius adipiscing praesent suspendisse sapien tincidunt. Tellus justo posuere cras magna morbi fames purus. Torquent consequat ad per a orci laoreet odio a. Accumsan aliquam enim ante tristique suspendisse. Montes cubilia ullamcorper dis vestibulum; justo suscipit vehicula etiam. Molestie vitae imperdiet sit a faucibus posuere felis. Tempor dolor phasellus non integer neque posuere sit. Curabitur mauris lectus congue consequat senectus pellentesque.
                Elementum nostra mauris potenti, porta convallis facilisis? Aenean tristique egestas nostra elit ultricies rutrum class. Varius urna ante dis cubilia massa venenatis. Pretium dapibus tempor orci torquent sit finibus. Imperdiet interdum neque, himenaeos mattis in platea. Donec consectetur accumsan non commodo nullam. Suspendisse faucibus velit ut et iaculis semper tincidunt. Venenatis ridiculus habitant lobortis; elit turpis litora.
                Dis praesent hac dapibus consequat sem venenatis nisl mus facilisi. Nisi ultricies sit dignissim, lobortis mi ultrices. Lorem tellus adipiscing integer class cubilia aenean. Porttitor eros sit lacus natoque odio ornare. Mollis cras ex mi eget eu senectus ornare. Commodo ultrices est neque; finibus suspendisse mollis velit. Facilisis risus curae mollis conubia lectus dignissim. Taciti turpis ultrices vehicula quam donec in. Aenean primis elementum est natoque magnis praesent cubilia facilisis mattis.
              </Heading>
              <Heading size="xs" className="mt-20">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Pretium varius adipiscing praesent suspendisse sapien tincidunt. Tellus justo posuere cras magna morbi fames purus. Torquent consequat ad per a orci laoreet odio a. Accumsan aliquam enim ante tristique suspendisse. Montes cubilia ullamcorper dis vestibulum; justo suscipit vehicula etiam. Molestie vitae imperdiet sit a faucibus posuere felis. Tempor dolor phasellus non integer neque posuere sit. Curabitur mauris lectus congue consequat senectus pellentesque.
                Elementum nostra mauris potenti, porta convallis facilisis? Aenean tristique egestas nostra elit ultricies rutrum class. Varius urna ante dis cubilia massa venenatis. Pretium dapibus tempor orci torquent sit finibus. Imperdiet interdum neque, himenaeos mattis in platea. Donec consectetur accumsan non commodo nullam. Suspendisse faucibus velit ut et iaculis semper tincidunt. Venenatis ridiculus habitant lobortis; elit turpis litora.
                Dis praesent hac dapibus consequat sem venenatis nisl mus facilisi. Nisi ultricies sit dignissim, lobortis mi ultrices. Lorem tellus adipiscing integer class cubilia aenean. Porttitor eros sit lacus natoque odio ornare. Mollis cras ex mi eget eu senectus ornare. Commodo ultrices est neque; finibus suspendisse mollis velit. Facilisis risus curae mollis conubia lectus dignissim. Taciti turpis ultrices vehicula quam donec in. Aenean primis elementum est natoque magnis praesent cubilia facilisis mattis.
              </Heading>
              <Heading size="xs" className="mt-20">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Pretium varius adipiscing praesent suspendisse sapien tincidunt. Tellus justo posuere cras magna morbi fames purus. Torquent consequat ad per a orci laoreet odio a. Accumsan aliquam enim ante tristique suspendisse. Montes cubilia ullamcorper dis vestibulum; justo suscipit vehicula etiam. Molestie vitae imperdiet sit a faucibus posuere felis. Tempor dolor phasellus non integer neque posuere sit. Curabitur mauris lectus congue consequat senectus pellentesque.
                Elementum nostra mauris potenti, porta convallis facilisis? Aenean tristique egestas nostra elit ultricies rutrum class. Varius urna ante dis cubilia massa venenatis. Pretium dapibus tempor orci torquent sit finibus. Imperdiet interdum neque, himenaeos mattis in platea. Donec consectetur accumsan non commodo nullam. Suspendisse faucibus velit ut et iaculis semper tincidunt. Venenatis ridiculus habitant lobortis; elit turpis litora.
                Dis praesent hac dapibus consequat sem venenatis nisl mus facilisi. Nisi ultricies sit dignissim, lobortis mi ultrices. Lorem tellus adipiscing integer class cubilia aenean. Porttitor eros sit lacus natoque odio ornare. Mollis cras ex mi eget eu senectus ornare. Commodo ultrices est neque; finibus suspendisse mollis velit. Facilisis risus curae mollis conubia lectus dignissim. Taciti turpis ultrices vehicula quam donec in. Aenean primis elementum est natoque magnis praesent cubilia facilisis mattis.
              </Heading>
              <Heading size="xs" className="mt-20">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Pretium varius adipiscing praesent suspendisse sapien tincidunt. Tellus justo posuere cras magna morbi fames purus. Torquent consequat ad per a orci laoreet odio a. Accumsan aliquam enim ante tristique suspendisse. Montes cubilia ullamcorper dis vestibulum; justo suscipit vehicula etiam. Molestie vitae imperdiet sit a faucibus posuere felis. Tempor dolor phasellus non integer neque posuere sit. Curabitur mauris lectus congue consequat senectus pellentesque.
                Elementum nostra mauris potenti, porta convallis facilisis? Aenean tristique egestas nostra elit ultricies rutrum class. Varius urna ante dis cubilia massa venenatis. Pretium dapibus tempor orci torquent sit finibus. Imperdiet interdum neque, himenaeos mattis in platea. Donec consectetur accumsan non commodo nullam. Suspendisse faucibus velit ut et iaculis semper tincidunt. Venenatis ridiculus habitant lobortis; elit turpis litora.
                Dis praesent hac dapibus consequat sem venenatis nisl mus facilisi. Nisi ultricies sit dignissim, lobortis mi ultrices. Lorem tellus adipiscing integer class cubilia aenean. Porttitor eros sit lacus natoque odio ornare. Mollis cras ex mi eget eu senectus ornare. Commodo ultrices est neque; finibus suspendisse mollis velit. Facilisis risus curae mollis conubia lectus dignissim. Taciti turpis ultrices vehicula quam donec in. Aenean primis elementum est natoque magnis praesent cubilia facilisis mattis.
              </Heading>
              <Heading size="xs" className="mt-20">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Pretium varius adipiscing praesent suspendisse sapien tincidunt. Tellus justo posuere cras magna morbi fames purus. Torquent consequat ad per a orci laoreet odio a. Accumsan aliquam enim ante tristique suspendisse. Montes cubilia ullamcorper dis vestibulum; justo suscipit vehicula etiam. Molestie vitae imperdiet sit a faucibus posuere felis. Tempor dolor phasellus non integer neque posuere sit. Curabitur mauris lectus congue consequat senectus pellentesque.
                Elementum nostra mauris potenti, porta convallis facilisis? Aenean tristique egestas nostra elit ultricies rutrum class. Varius urna ante dis cubilia massa venenatis. Pretium dapibus tempor orci torquent sit finibus. Imperdiet interdum neque, himenaeos mattis in platea. Donec consectetur accumsan non commodo nullam. Suspendisse faucibus velit ut et iaculis semper tincidunt. Venenatis ridiculus habitant lobortis; elit turpis litora.
                Dis praesent hac dapibus consequat sem venenatis nisl mus facilisi. Nisi ultricies sit dignissim, lobortis mi ultrices. Lorem tellus adipiscing integer class cubilia aenean. Porttitor eros sit lacus natoque odio ornare. Mollis cras ex mi eget eu senectus ornare. Commodo ultrices est neque; finibus suspendisse mollis velit. Facilisis risus curae mollis conubia lectus dignissim. Taciti turpis ultrices vehicula quam donec in. Aenean primis elementum est natoque magnis praesent cubilia facilisis mattis.
              </Heading>
              {/* <PrismicNextImage field={item.image} className="xl:w-[1000px] mb-16"/>
              <PrismicRichText
              field={item.text}
              /> */}
          </div>
            
          

        </div>
        </div>
        </Bounded>

        </div>

        {/* menu overlay items */}
        {/* <div className="menu-close-icon">
          bottom left "X", can be something else <p>&#x2715;</p>
        </div> */}
        {/* <div className="menu-copy">
          <div className="menu-links">
            {menuLinks.map((link, index) => (
              <div key={index} className="menu-link-item">
                <div className="menu-link-item-holder" onClick={toggleMenu}>
                  <Link className="menu-link" href={link.path}>
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-info">
            <div className="menu-info-col">
              <a href="#">X &#8599;</a>
              <a href="#">Instagram &#8599;</a>
              <a href="#">LinkedIn &#8599;</a>
              <a href="#">Behance &#8599;</a>
              <a href="#">Dribbble &#8599;</a>
            </div>
            <div className="menu-info-col">
              <p>info@codegrid.com</p>
              <p>0923 3984 23</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Menu;

{/* <div className="menu-preview">
  bottom right small text
</div> */}
{/* <p className="mt-24 border-t border-accent flex gap-4 text-accent text-xl font-bold">
  {blog.tags.map((tag) => (
    <span className="mt-8" key={tag}>{tag}</span>
  ))}
  </p> */}
  