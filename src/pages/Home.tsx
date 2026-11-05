import HomeFaqSection from "../components/home/HomeFaqSection";
import HomeHeroSection from "../components/home/HomeHeroSection";
import HomeHowSection from "../components/home/HomeHowSection";
import HomeServiceSection from "../components/home/HomeServiceSection";
const Home = () => { 
    
    return (
        <div className="flex-cols">
            <HomeHeroSection />
            <HomeServiceSection/>
            <HomeHowSection/>
            <HomeFaqSection/>
        </div>
    )
} 

export default Home; 