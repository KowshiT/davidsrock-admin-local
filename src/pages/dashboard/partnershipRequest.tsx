import HomeLeftMenuListCard from "../../components/Card/features/home/homeLeftMenuListCard";
import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import { SectionRow } from "@/layouts/section";
import React from "react";
import PartnershipMainProfile from "../../components/Card/features/partnership/partnershipMainProfile";
import PartnershipSendRequest from "../../components/Card/features/partnership/partnershipSendRequest";

export interface partnershipRequestProps {}

const partnershipRequest: React.FC<partnershipRequestProps> = (props) => {
  return (
    <React.Fragment>
      <div className="homeMainSec">
        <NavBar />
        <div className="homeMidSec">
          <div className="flex flex-row">
            <HomeLeftMenuListCard />
            <PartnershipSendRequest />
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default partnershipRequest;
