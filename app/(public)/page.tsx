import Hero from "@/components/Hero";
import Informations from "@/components/Informations";
import Pasteurs from "@/components/pasteurs";
import Programme from "@/components/programme";

export default function Home() {
  return (
    <>
      <Hero />
      <Programme />
      <Informations />
      <Pasteurs />
    </>
  );
}
