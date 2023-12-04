import HomeLeftMenuListCard from "../../components/Card/features/home/homeLeftMenuListCard";
import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import { SectionRow } from "@/layouts/section";
import React from "react";
import PartnershipMainProfile from "../../components/Card/features/partnership/partnershipMainProfile";
import PartnershipListView from "../../components/Card/features/partnership/list/partnershipListView";

export interface HomeProps {}

const ViewPartnershipList: React.FC<HomeProps> = (props) => {
  return (
    <React.Fragment>
      <div className="homeMainSec">
        <NavBar />
        <div className="homeMidSec">
          <div className="flex flex-row">
            <HomeLeftMenuListCard />
            <PartnershipListView />
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ViewPartnershipList;
