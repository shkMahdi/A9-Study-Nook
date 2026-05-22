import Banner from "./components/Banner";
import FeaturedRooms from "./components/FeaturedRooms";
import HowItWorks from "./components/HowItWorks";
import WhyStudyNook from "./components/WhyStudyNook";

export default function Home() {
  return (
     <div>
        <Banner></Banner>
        <FeaturedRooms></FeaturedRooms>
        <WhyStudyNook></WhyStudyNook>
        <HowItWorks></HowItWorks>
     </div>
  );
}
