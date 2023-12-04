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
import CreateOrganizationStep01 from "../../components/Card/features/organization/components/createOrganization/step01";
import CreateOrganizationStep02 from "../../components/Card/features/organization/components/createOrganization/step02";
import CreateOrganizationStep03 from "../../components/Card/features/organization/components/createOrganization/step03";
import CreateOrganizationStep04 from "../../components/Card/features/organization/components/createOrganization/step04";
import CreateOrganizationStep05 from "../../components/Card/features/organization/components/createOrganization/step05";
import CreateOrganizationStep06 from "../../components/Card/features/organization/components/createOrganization/step06";
import { OrganizationCreateStageContext } from "@/contexts/organizationContext/organizationCreateStageContext";
import WarningPopup from "../../components/Modal/alert/alertModel";

export interface HomeProps {}

const CreateOrganization: React.FC<HomeProps> = (props) => {
  const { organizationCreateStageCount } = useContext(
    OrganizationCreateStageContext
  );

  const handleCreateOrganizationProcessSesion = (count: number | null) => {
    switch (count) {
      case 1:
        return <CreateOrganizationStep02 />;
        break;
      case 2:
        return <CreateOrganizationStep03 />;
        break;
      case 3:
        return <CreateOrganizationStep04 />;
        break;
      case 4:
        return <CreateOrganizationStep05 />;
        break;
      case 5:
        return <CreateOrganizationStep06 />;
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
            {handleCreateOrganizationProcessSesion(
              organizationCreateStageCount
            )}
          </SectionRow>
        </div>
        <Footer />
        <WarningPopup />
      </div>
    </React.Fragment>
  );
};

export default CreateOrganization;
