import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from "../../components/herosection/HeroSection";
import Property from "../../components/featuredproperty/Property";
import Faqs from "../../components/faqs/Faqs";
import Category from "../../components/category/Category";
import About from "../../components/about/About";
import Contact from "../../components/contact/Contact";

function Home({ openLogin }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.substring(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>
      <HeroSection openLogin={openLogin} />
      <About />
      <Category openLogin={openLogin} />
      <Property openLogin={openLogin} />
      <Faqs />
      <Contact />
    </div>
  );
}

export default Home;