import TimelineMainCard from "../components/Card/features/timeline/timelineMaincard";
import TimelineLeftMenuCard from "../components/Card/features/timeline/timelineLeftMenuCard";
import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import { SectionRow } from "@/layouts/section";
import { NextPage } from "next";
import Router from "next/router";
import React, { useEffect } from "react";
import TimelineRightMenuCard from "../components/Card/features/timeline/timelineRightMenuCard";
import WarningPopup from "../components/Modal/alert/alertModel";

const APP: NextPage = () => {
  useEffect(() => {
    Router.push("/auth");
  }, []);

  return <React.Fragment></React.Fragment>;
};

export default APP;
