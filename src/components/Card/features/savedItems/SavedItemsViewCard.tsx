import React, { useState } from "react";
import { SectionRow } from "@/layouts/section";
import SavedEvents from "./SavedItemsSwitchComponents/SavedEvents";
import SavedPosts from "./SavedItemsSwitchComponents/SavedPosts";

export interface SavedItemsListViewProps { }

const SavedItemsListView: React.FC<SavedItemsListViewProps> = (props) => {
  const [buttonSwichState, setButtonSwichState] = useState("EVENTS");

  return (
    <div className="homeRightMainSec pt-4">
      <div>
        <SectionRow>
          <button
            onClick={(e: any) => {
              setButtonSwichState("EVENTS");
            }}
            className="ml-5
              "
          >
            <div
              className={
                buttonSwichState === "EVENTS"
                  ? "dashboardMainTextA !mb-4"
                  : "dashboardMainText-l !mb-4"
              }
            >
              Events
            </div>
            {buttonSwichState === "EVENTS" ? (
              <div className="seletcedLine transform transition duration-500"></div>
            ) : (
              <div className="seletcedLineHide transform transition duration-500"></div>
            )}
          </button>
          <button
            onClick={(e: any) => {
              setButtonSwichState("POSTS");
            }}
            className="ml-12"
          >
            <div
              className={
                buttonSwichState === "POSTS"
                  ? "dashboardMainTextA !mb-4 transform transition duration-500"
                  : "dashboardMainText-l !mb-4 transform transition duration-500"
              }
            >
              Posts
            </div>
            {buttonSwichState === "POSTS" ? (
              <div className="seletcedLine transform transition duration-500"></div>
            ) : (
              <div className="seletcedLineHide transform transition duration-500"></div>
            )}
          </button>
        </SectionRow>
      </div>
      {buttonSwichState === "EVENTS" && <SavedEvents />}
      {buttonSwichState === "POSTS" && <SavedPosts />}

    </div>
  );
};
export default SavedItemsListView;
