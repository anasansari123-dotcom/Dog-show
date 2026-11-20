import CtaBand from "@/components/CtaBand";
import Hero from "@/components/Hero";
import HomeExplore from "@/components/HomeExplore";
import Marquee from "@/components/Marquee";
import Videos from "@/components/Videos";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <HomeExplore />
      <Videos />
      <CtaBand />
    </>
  );
}
