import MessageMainWrapper from "../../../components/Card/features/message/messageMainWrapper";
import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import { NextPage } from "next";
import React from "react";

const Message: NextPage = () => {
  return (
    <React.Fragment>
      <NavBar />
      <div className="homeMainSec ">
        <div className="main-Wrapper-container">
          <MessageMainWrapper />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default Message;
