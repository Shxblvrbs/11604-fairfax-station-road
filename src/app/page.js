import Image from "next/image";

import Slider from "@/components/slider/Slider";
import BackgroundVideo from "@/components/BackgroundVideo";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <BackgroundVideo />
      <Slider />
    </>
  );
}
