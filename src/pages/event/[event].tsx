import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import Section, { SectionRow } from "@/layouts/section";
import { LoginValues } from "@/types/types";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { useContext } from "react";
import EventLeftMenuCard from "../../components/Card/features/event/eventLeftMenuCard";
import EventDetailsView from "../../components/Card/features/event/eventDetailsView";

export interface EventProps {}

const Event: React.FC<EventProps> = (props) => {
  return (
    <React.Fragment>
      <div className="homeMainSec">
        <NavBar />
        <div className="homeMidSec">
          <SectionRow>
            <EventDetailsView />
          </SectionRow>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Event;
