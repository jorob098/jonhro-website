// pages/Home.jsx (or wherever your Home file is)

import Hero from './Hero';
import Affiliations from './Affiliations';
import GetToKnow from './GetToKnow';
import ServicesIntro from '../components/ServicesIntro'; // Adjust if not correct
import WhyChooseMe from './WhyChooseMe';
import ContactIntro from './ContactIntro';



export default function Home() {
  return (
    <>
      <Hero />
      <Affiliations />
      <GetToKnow />
      <ServicesIntro />
      <WhyChooseMe />
      <ContactIntro />
    
      
    </>
  );
}
