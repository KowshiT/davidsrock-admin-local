import Footer from "@/layouts/footer/footer";
import NavBar from "@/layouts/navbar/navbar";
import { SectionColumn, SectionRow } from "@/layouts/section";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import TimelineLeftMenuCard from "./timelineLeftMenuCard";
import TimelineMainCard from "./timelineMaincard";
import RoundedButton from "../../../../components/Buttons/RoundedButtons";
import TimelineRightMenuCard from "./timelineRightMenuCard";

export interface TimelineWithConditionalMenuProps {
  interestOrganizationList: any;
  timelineList: any;
  organizationList: any;
  eventList: any;
  handleTimelinePagination: any;
  size: any;
  setSize: any;
}
const TimelineWithConditionalMenu: React.FC<
  TimelineWithConditionalMenuProps
> = (props) => {
  const [showRightMenu, setShowRightMenu] = useState(true);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setShowRightMenu(window.innerWidth >= 1310);
  //   };

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <div className="homeMainSecFixed">
      <NavBar />
      <div className="homeMidSec">
        <div className="homeMidSecWrapper flex flex-row">
          {!showRightMenu ? (
            <SectionColumn className="timelineWrapperScroll-right-card">
              <TimelineLeftMenuCard />
              <TimelineRightMenuCard
                organizationList={props.organizationList}
                eventList={props.eventList}
              />
            </SectionColumn>
          ) : (
            <TimelineLeftMenuCard />
          )}
          <div className="timelineWrapperScroll px-4 pt-4 pb-5">
            <TimelineMainCard
              interestOrganizationList={props.interestOrganizationList}
              timelineList={props.timelineList}
            />
            {/* {(props.timelineList && props.timelineList.length % 10 === 0) ? */}
            <div className="mt-3 flex items-center justify-center">
              <RoundedButton
                ref={undefined}
                onClick={(e: any) => {
                  props.handleTimelinePagination(props.size + 5);
                  props.setSize(props.size + 5);
                }}
                className="loadMoreBTN"
              >
                <SectionRow className="items-center justify-center">
                  <span className="px-1">Load More</span>
                  <IoIosArrowDown />
                </SectionRow>
              </RoundedButton>
            </div>
            {/* : null} */}
          </div>

          {showRightMenu && (
            <TimelineRightMenuCard
              organizationList={props.organizationList}
              eventList={props.eventList}
              rightAlign
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TimelineWithConditionalMenu;
