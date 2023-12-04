import PublicProfileDetailsView from "../../components/Card/features/publicProfile/publicProfileDetailsView";
import Footer from "../../layouts/footer/footer";
import NavBar from "../../layouts/navbar/navbar";
import Section, { SectionRow } from "../../layouts/section";
import React, { useContext } from "react";

export interface PublicProfileProps {}

const PublicProfile: React.FC<PublicProfileProps> = (props) => {
  return (
    <React.Fragment>
      <div className="homeMainSec">
        <NavBar />
        <div className="homeMidSec">
          <SectionRow>
            <PublicProfileDetailsView />
          </SectionRow>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default PublicProfile;
