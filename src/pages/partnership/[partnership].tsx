import OrganizationDetailsView from "../../components/Card/features/organization/organizationDetailsView";
import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import Section, { SectionRow } from "@/layouts/section";
import { LoginValues } from "@/types/types";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { useContext } from "react";
import PartnershipDetailView from "../../components/Card/features/partnership/partnershipDetailView";

export interface PartnershipProps {}

const Partnership: React.FC<PartnershipProps> = (props) => {
  return (
    <React.Fragment>
      <div className="homeMainSec">
        <NavBar />
        <div className="homeMidSec">
          <SectionRow>
            <PartnershipDetailView />
          </SectionRow>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Partnership;
