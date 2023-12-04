import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import React, { ChangeEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  acceptPartnershipActionHandler,
  cancelPartnershipRequestActionHandler,
} from "@/actionLayer/partnership/partnershipActions";
import { useSuccessPopup } from "@/contexts/modalContext/successPopupProvider";
import { useAlerts } from "@/hooks/alertHook";

interface AcceptCardProps {
  isRequestProfileIdClicked: boolean;
  handleAcceptCancelReceivedButtonClick: Function;
  profileId: any;
  partnershipName: any;
  //handleAcceptRequest: Function;
  reqId: any;
  // handleCancelRequest: Function;
  participantProfileType: any;
  initialProfileId: any;
  accountType: any;
  profileName: any;
  receivedRequestMessage: any;
  setLoaderOpen: any;
}

const AcceptCard: React.FC<AcceptCardProps> = (props) => {
  const { setAlert } = useAlerts();

  const {
    setSubTitle,
    setTitle,
    setPartnershipName,
    setPartnershipPicture1,
    setPartnershipPicture2,
    openSuccessPopup,
    setPublicURL,
  } = useSuccessPopup();

  const handleAcceptRequest = (id: any, name: any) => {
    acceptPartnershipActionHandler(id, name)
      .then((res: any) => {
        setTitle("Congratulations");
        setSubTitle(`You've just formed a new partnership with ${res?.requestedProfileName}. This is a step towards mutual growth and
            collaboration. Here's to a successful and fruitful
            partnership!. To see the new partnership profile, please click the "Continue" button. 👇`);
        setPartnershipName(res?.partnershipEntityDto?.partnershipName);
        setPublicURL(res?.partnershipEntityDto?.publicUrl);
        setPartnershipPicture1(
          res?.partnershipEntityDto?.partnershipDetailEntityList[0]
            .profileImagePath
        );
        setPartnershipPicture2(
          res?.partnershipEntityDto?.partnershipDetailEntityList[1]
            .profileImagePath
        );
        openSuccessPopup();

        setAlert({
          message: "Approved!",
          severity: "success",
        });
        props.setLoaderOpen(false);
        console.log("res :>> ", res);
      })
      .catch((error) => {
        setAlert({
          message: "There is something wrong. Please try again!",
          severity: "error",
        });
        return error;
      });
  };

  const handleCancelRequest = (
    reqId: any,
    senderID: any,
    senderOrganizationCategory: any,
    receiverID: any,
    receiverOrganizationCategory: any,
    message: any
  ) => {
    cancelPartnershipRequestActionHandler(
      reqId,
      senderID,
      senderOrganizationCategory,
      receiverID,
      receiverOrganizationCategory
    ).then((res) => {
      if (res?.responseCode === "00") {
        setAlert({
          message: message,
          severity: "success",
        });
      } else {
        setAlert({
          message: "There is something wrong. Please try again later!",
          severity: "error",
        });
      }
    });
  };
  return (
    <div className="flex justify-end">
      {!props.isRequestProfileIdClicked ? (
        <>
          <div className="z-50">
            <RoundedButton
              ref={undefined}
              onClick={(e: any) => {
                e.stopPropagation();
                props.handleAcceptCancelReceivedButtonClick(
                  props.profileId,
                  "Request Accepted!"
                );
                handleAcceptRequest(props.reqId, props.partnershipName);
              }}
              className="accept-button"
            >
              Accept
            </RoundedButton>
          </div>

          <div className="z-50 px-1">
            <RoundedButton
              ref={undefined}
              onClick={(e: any) => {
                e.stopPropagation();
                props.handleAcceptCancelReceivedButtonClick(
                  props.profileId,
                  "Request Removed!"
                );
                handleCancelRequest(
                  props.reqId,
                  props.profileId,
                  props.participantProfileType,
                  props.initialProfileId,
                  props.accountType,
                  `Successfully decline ${props.profileName}'s request`
                );
              }}
              className="cancel-button "
            >
              Decline
            </RoundedButton>
          </div>
        </>
      ) : (
        <span className="h3-dark-gray-13-text">
          {props.receivedRequestMessage
            ? props.receivedRequestMessage?.message
            : ""}
        </span>
      )}
    </div>
  );
};

export default AcceptCard;
