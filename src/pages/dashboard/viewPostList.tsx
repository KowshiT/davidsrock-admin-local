import HomeLeftMenuListCard from "../../components/Card/features/home/homeLeftMenuListCard";
import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import { SectionRow } from "@/layouts/section";
import React from "react";

export interface HomeProps {}

const ViewPostList: React.FC<HomeProps> = (props) => {
  return (
    <React.Fragment>
      <div className="homeMainSec">
        <NavBar />
        <div className="homeMidSec">
          <div className="flex flex-row">
            <HomeLeftMenuListCard />
            View Post List
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ViewPostList;
