import UserProfileDetailView from "../../components/Card/features/userProfile/userProfileDetailView";
import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import { SectionRow } from "@/layouts/section";
import React from "react";

export interface userProfileProps {}

const userProfile: React.FC<userProfileProps> = (props) => {
  return (
    <React.Fragment>
      <div className="homeMainSec">
        <NavBar />
        <div className="homeMidSec">
          <SectionRow>
            <UserProfileDetailView />
          </SectionRow>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default userProfile;
