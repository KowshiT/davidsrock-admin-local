import HomeLeftMenuListCard from "../../components/Card/features/home/homeLeftMenuListCard";
import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import Section, { SectionRow } from "@/layouts/section";
import React, { useContext } from "react";
import PublicProfileLeftMenuCard from "../../components/Card/features/publicProfile/publicProfileLeftMenuCard";
import PublicProfileListViewCard from "../../components/Card/features/publicProfile/components/listView/publicProfileListViewCard";

export interface HomeProps {}

const PublicProfileListView: React.FC<HomeProps> = (props) => {
  return (
    <React.Fragment>
      <div className="homeMainSec">
        <NavBar />
        <div className="homeMidSec">
          <div className="flex flex-row">
            <HomeLeftMenuListCard />
            <PublicProfileListViewCard />
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default PublicProfileListView;
