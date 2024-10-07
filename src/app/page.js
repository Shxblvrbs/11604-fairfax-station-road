import Image from "next/image";

import Slider from "@/components/slider/Slider";
import BackgroundVideo from "@/components/BackgroundVideo";

export default function Home() {
  return (
    <>
      <BackgroundVideo />
      <Slider />
    </>
  );
}
