import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import { SectionRow } from "@/layouts/section";
import React, { useContext } from "react";
import PublicProfileLeftMenuCard from "../../components/Card/features/publicProfile/publicProfileLeftMenuCard";
import { PublicProfileCreateStageContext } from "@/contexts/publicProfileContext/createPublicProfileStageContext";
import CreatePublicProfileStep01 from "../../components/Card/features/publicProfile/components/createPublicProfile/CreatePublicProfileStep01";
import CreatePublicProfileStep02 from "../../components/Card/features/publicProfile/components/createPublicProfile/CreatePublicProfileStep02";
import CreatePublicProfileStep03 from "../../components/Card/features/publicProfile/components/createPublicProfile/CreatePublicProfileStep03";
import CreatePublicProfileStep04 from "../../components/Card/features/publicProfile/components/createPublicProfile/CreatePublicProfileStep04";
import CreatePublicProfileStep05 from "../../components/Card/features/publicProfile/components/createPublicProfile/CreatePublicProfileStep05";
import CreatePublicProfileStep06 from "../../components/Card/features/publicProfile/components/createPublicProfile/CreatePublicProfileStep06";
import HomeLeftMenuListCard from "../../components/Card/features/home/homeLeftMenuListCard";
import WarningPopup from "../../components/Modal/alert/alertModel";

export interface HomeProps {}

const CreatePublicProfile: React.FC<HomeProps> = (props) => {
  const { publicProfileCreateStageCount } = useContext(
    PublicProfileCreateStageContext
  );

  const handleCreatePublicProfileProcessSesion = (count: number | null) => {
    switch (count) {
      case 1:
        return <CreatePublicProfileStep01 />;
        break;
      case 2:
        return <CreatePublicProfileStep02 />;
        break;
      case 3:
        return <CreatePublicProfileStep03 />;
        break;
      case 4:
        return <CreatePublicProfileStep06 />;
        break;
      case 5:
        return <CreatePublicProfileStep04 />;
        break;
      case 6:
        return <CreatePublicProfileStep05 />;
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <div className="homeMainSec">
        <NavBar />
        <div className="homeMidSec">
          <SectionRow>
            <HomeLeftMenuListCard />
            {handleCreatePublicProfileProcessSesion(
              publicProfileCreateStageCount
            )}
          </SectionRow>
        </div>
        <Footer />
        <WarningPopup />
      </div>
    </React.Fragment>
  );
};

export default CreatePublicProfile;
