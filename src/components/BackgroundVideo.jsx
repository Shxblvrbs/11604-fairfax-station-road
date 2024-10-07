"use client";

import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const BackgroundVideo = () => {
  return (
    <div className="background-video min-h-screen absolute pointer-events-none inset-0 -z-40 h-full opacity-95 -mt-5">
      <ReactPlayer
      url={`https://vimeo.com/1016517215`} 
      controls={false}
      playing={true}  // This handles autoplay
      loop={true}
      muted={true}  // Muted to allow autoplay in Safari
      playsinline={true}  // Important for iOS Safari
      width="100%"
      height="100%"
      />
    </div>
  )
}

export default BackgroundVideo;