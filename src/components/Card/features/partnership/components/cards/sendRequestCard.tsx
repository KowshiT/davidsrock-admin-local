import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import React, { ChangeEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  acceptPartnershipActionHandler,
  cancelPartnershipRequestActionHandler,
  createPartnershipActionHandler,
} from "@/actionLayer/partnership/partnershipActions";
import { useSuccessPopup } from "@/contexts/modalContext/successPopupProvider";
import { useAlerts } from "@/hooks/alertHook";
import { getProfileId, getUserAccountType } from "@/helpers/authHelper";
import { useUser } from "@/contexts/authContext/userProvider";

interface SendRequestCardProps {
  isProfileIdClicked: boolean;
  handleButtonClick: Function;
  profileId: any;
  profileName: any;
  profileType: any;
  initialProfileId: any;
  accountType: any;
  setLoaderOpen: any;
}

const SendRequestCard: React.FC<SendRequestCardProps> = (props) => {
  const { setAlert } = useAlerts();
  const { userName } = useUser();

  const handleSendPartnershipRequest = (
    receiverID: any,
    receiverName: any,
    accountType: any
  ) => {
    const partnershipName = userName + " & " + receiverName;

    const requestPayload = {
      senderID: getProfileId(),
      receiverID: receiverID,
      senderName: userName,
      senderOrganizationCategory: getUserAccountType(),
      receiverName: receiverName,
      receiverOrganizationCategory: accountType,
      partnershipName: partnershipName,
    };

    createPartnershipActionHandler(requestPayload)
      .then((res: any) => {
        setAlert({
          message: "Sent!",
          severity: "success",
        });
        props.setLoaderOpen(false);
        console.log("res :>> ", res);
      })
      .catch((error) => {
        setAlert({
          message: "Error Fetch Organization!",
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
      <div className="z-50 px-1">
        {!props.isProfileIdClicked ? (
          <RoundedButton
            ref={undefined}
            onClick={(e: any) => {
              e.stopPropagation();
              props.handleButtonClick(props.profileId);
              handleSendPartnershipRequest(
                props.profileId,
                props.profileName,
                props.profileType
              );
            }}
            className="accept-button-default-width"
          >
            Add new Partnership
          </RoundedButton>
        ) : (
          <RoundedButton
            ref={undefined}
            onClick={(e: any) => {
              e.stopPropagation();
              props.handleButtonClick(props.profileId);
              handleCancelRequest(
                null,
                props.initialProfileId,
                props.accountType,
                props.profileId,
                props.profileType,
                "Successfully cancel request"
              );
            }}
            className="cancel-button-default-width"
          >
            Cancel Request
          </RoundedButton>
        )}
      </div>
    </div>
  );
};

export default SendRequestCard;
