import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import React, { ChangeEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  acceptPartnershipActionHandler,
  cancelPartnershipRequestActionHandler,
} from "@/actionLayer/partnership/partnershipActions";
import { useSuccessPopup } from "@/contexts/modalContext/successPopupProvider";
import { useAlerts } from "@/hooks/alertHook";

interface CancelCardProps {
  isCancelButtonClicked: boolean;
  handleCancelPendingButtonClick: Function;
  profileId: any;
  reqId: any;
  profileType: any;
  initialProfileId: any;
  accountType: any;
  setLoaderOpen: any;
}

const CancelCard: React.FC<CancelCardProps> = (props) => {
  const { setAlert } = useAlerts();

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
        {!props.isCancelButtonClicked ? (
          <RoundedButton
            ref={undefined}
            onClick={(e: any) => {
              e.stopPropagation();
              props.handleCancelPendingButtonClick(props.profileId);
              handleCancelRequest(
                props.reqId,
                props.initialProfileId,
                props.accountType,
                props.profileId,
                props.profileType,
                "Successfully removed request"
              );
            }}
            className="cancel-button-default-width"
          >
            Cancel Request
          </RoundedButton>
        ) : (
          <span className="h3-dark-gray-13-text">
            You have canceled Partnership request
          </span>
        )}
      </div>
    </div>
  );
};

export default CancelCard;
