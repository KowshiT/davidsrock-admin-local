import OrganizationDetailsView from "../../components/Card/features/organization/organizationDetailsView";
import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import Section, { SectionRow } from "@/layouts/section";
import { LoginValues } from "@/types/types";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { useContext } from "react";

export interface OrganizationProps { }

const Organization: React.FC<OrganizationProps> = (props) => {
  return (
    <React.Fragment>
      <div className="homeMainSec">
        <NavBar />
        <div className="homeMidSec">
          <SectionRow>
            <OrganizationDetailsView />
          </SectionRow>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Organization;
