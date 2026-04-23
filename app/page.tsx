import Navbar from '@/components/nav/Navbar'
import HeroScroll from '@/components/hero/HeroScroll'
import Introduction from '@/components/sections/Introduction'
import Performance from '@/components/sections/Performance'
import DesignPhilosophy from '@/components/sections/DesignPhilosophy'
import Models from '@/components/sections/Models'
import Footer from '@/components/footer/Footer'

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <HeroScroll />
      <section id="models"><Introduction /></section>
      <section id="performance"><Performance /></section>
      <section id="design"><DesignPhilosophy /></section>
      <section id="experience"><Models /></section>
      <section id="innovation"><Footer /></section>
    </main>
  )
}
