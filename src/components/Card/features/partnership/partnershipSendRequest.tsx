import RoundedButton from "../../../../components/Buttons/RoundedButtons";
import { SectionColumn, SectionRow } from "@/layouts/section";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { profilePic } from "@/assetsLayer";
import SearchBar from "./components/SearchBar";
import { getAllPartnershipActionHandler } from "@/actionLayer/partnership/partnershipActions";
import { useAlerts } from "@/hooks/alertHook";
import { toggleIdInArrayList } from "@/helpers/features/partnership/partnershipHelper";

export interface PartnershipSendRequestProps {}

const PartnershipSendRequest: React.FC<PartnershipSendRequestProps> = (
  props
) => {
  const { setAlert } = useAlerts();
  const [organizationList, setOrganizationList] = useState<any>([]);
  const [sentRequestList, setSentRequestList] = useState<number[]>([]);
  const organizationPayload = {
    page: 0,
    size: 5,
    isDescending: true,
    loggedUserId: 2,
    profileType: "INITIAL",
  };

  useEffect(() => {
    getAllPartnershipActionHandler(organizationPayload)
      .then((res: any) => {
        if (res?.responseCode === "00") {
          setOrganizationList(res.organization);
          console.log("res :>> ", res.organization);
        } else {
          setAlert({
            message: "Error!",
            severity: "error",
          });
        }
        return res;
      })
      .catch((error) => {
        setAlert({
          message: "Error!",
          severity: "error",
        });
        return error;
      });
  }, []);

  const handleSearch = (searchTerm: string): void => {
    // Implement your search logic here.
    // For now, let's return the length of the search term.
    console.log("Value", searchTerm);
  };

  const renderRequestTab = (item: any) => {
    return (
      <div className=" mt-4">
        <SectionRow>
          <SectionRow className="w-3/4">
            <div className="">
              <Image
                src={profilePic}
                alt="Picture of the author"
                width={50}
                height={50}
                className="rounded-full ring ring-white"
              />
            </div>

            <SectionColumn className="partnership-request-sub-container">
              <div className="">
                <span className="partnershipMinHeader">
                  {item?.profile.profileName}
                </span>
              </div>
              <div className="">
                <span className="partnershipGrayText">
                  Send a partnership request
                </span>
              </div>
            </SectionColumn>
          </SectionRow>

          <div className="my-auto flex w-1/4 justify-end">
            <div className="px-1">
              <RoundedButton
                ref={undefined}
                onClick={(e: any) => {
                  toggleIdInArrayList(
                    sentRequestList,
                    item?.profile.profileId,
                    setSentRequestList
                  );
                }}
                className="request-button"
              >
                Send Request
              </RoundedButton>
            </div>
          </div>
        </SectionRow>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="homeRightMainSec2 pb-4">
        <SectionRow className="w-full">
          <span className="partnershipHeader mb-8 w-1/2">
            Start a Partnership
          </span>
          <div className="flex w-1/2 justify-end">
            <div className="w-2/3">
              <SearchBar
                onSearch={handleSearch}
                className="search-bar-container"
              />
            </div>
          </div>
        </SectionRow>

        <SectionRow>
          <SectionColumn className="w-1/2">
            <div className="">
              <span className="partnershipSubTopic">
                Sending Partnership Requests
              </span>
              {organizationList?.map((item: any) => renderRequestTab(item))}
            </div>
          </SectionColumn>
        </SectionRow>

        {/* <div className="mt-3 flex items-center justify-center">
          <RoundedButton
            ref={undefined}
            onClick={(e: any) => {}}
            className="loadMoreBTN"
          >
            <SectionRow className="items-center justify-center">
              <span className="px-1">Load More</span>
              <IoIosArrowDown />
            </SectionRow>
          </RoundedButton>
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default PartnershipSendRequest;
