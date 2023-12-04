import React, { useEffect } from "react";
import HomeLeftMenuListCard from "../../components/Card/features/home/homeLeftMenuListCard";
import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import HomeDashboardCard from "../../components/Card/features/home/components/dashboard/homeDashboardCard";

export interface HomeProps { }

const Home: React.FC<HomeProps> = (props) => {

  useEffect(() => {
    if (!localStorage.getItem("REFRESHTOKEN")) {
      window.location.replace("/auth");
    }
  }, [])

  return (
    <div className="homeMainSec">
      <NavBar />
      <div className="homeMidSec">
        <div className="flex flex-row">
          <HomeLeftMenuListCard />
          <HomeDashboardCard />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
