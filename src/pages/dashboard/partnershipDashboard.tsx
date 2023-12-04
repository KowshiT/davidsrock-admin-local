import HomeLeftMenuListCard from "../../components/Card/features/home/homeLeftMenuListCard";
import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import { SectionRow } from "@/layouts/section";
import React from "react";
import PartnershipMainProfile from "../../components/Card/features/partnership/partnershipMainProfile";
import WarningPopup from "../../components/Modal/alert/alertModel";
import SuccessPopup from "../../components/Modal/success/successModal";

export interface HomeProps {}

const PartnershipDashboard: React.FC<HomeProps> = (props) => {
  return (
    <React.Fragment>
      <div className="homeMainSec">
        <NavBar />
        <div className="homeMidSec">
          <div className="flex flex-row">
            <HomeLeftMenuListCard />
            <PartnershipMainProfile />
          </div>
        </div>
        <Footer />
        <WarningPopup />
        <SuccessPopup />
      </div>
    </React.Fragment>
  );
};

export default PartnershipDashboard;
