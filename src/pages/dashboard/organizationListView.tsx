import HomeLeftMenuListCard from "../../components/Card/features/home/homeLeftMenuListCard";
import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import Section, { SectionRow } from "@/layouts/section";
import { LoginValues } from "@/types/types";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { useContext } from "react";
import HomeDashboardCard from "../../components/Card/features/home/components/dashboard/homeDashboardCard";
import OrganizationLeftMenuCard from "../../components/Card/features/organization/organizationLeftMenuCard";
import OrganizationlistView from "../../components/Card/features/organization/components/listView/listView";

export interface HomeProps {}

const OrganizationListView: React.FC<HomeProps> = (props) => {
  return (
    <React.Fragment>
      <div className="homeMainSec">
        <NavBar />
        <div className="homeMidSec">
          <div className="flex flex-row">
            <HomeLeftMenuListCard />
            <OrganizationlistView />
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default OrganizationListView;
