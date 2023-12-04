import HomeLeftMenuListCard from "../../components/Card/features/home/homeLeftMenuListCard";
import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import Section, { SectionRow } from "@/layouts/section";
import React, { useContext } from "react";
import EventLeftMenuCard from "../../components/Card/features/event/eventLeftMenuCard";
import CreateEventStep01 from "../../components/Card/features/event/components/createEvents/step01";
import CreateEventStep02 from "../../components/Card/features/event/components/createEvents/step02";
import CreateEventStep03 from "../../components/Card/features/event/components/createEvents/step03";
import CreateEventStep04 from "../../components/Card/features/event/components/createEvents/step04";
import CreateEventStep01Location from "../../components/Card/features/event/components/createEvents/step01-Location";
import { OrganizationCreateStageContext } from "@/contexts/organizationContext/organizationCreateStageContext";
import { EventCreateStageContext } from "@/contexts/eventContext/eventCreateStageContext";
import WarningPopup from "../../components/Modal/alert/alertModel";

export interface HomeProps { }

const CreateEvent: React.FC<HomeProps> = (props) => {
  const { eventCreateStageCount } = useContext(EventCreateStageContext);
  const handleCreateEventProcessSesion = (count: number | null) => {
    switch (count) {
      case 1:
        return <CreateEventStep01 />;
        break;
      case 2:
        return <CreateEventStep01Location />;
        break;
      case 3:
        return <CreateEventStep02 />;
        break;
      case 4:
        return <CreateEventStep03 />;
        break;
      case 5:
        return <CreateEventStep04 />;
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
            {handleCreateEventProcessSesion(eventCreateStageCount)}
          </SectionRow>
        </div>
        <Footer />
        <WarningPopup />
      </div>
    </React.Fragment>
  );
};

export default CreateEvent;
