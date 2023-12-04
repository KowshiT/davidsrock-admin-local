
import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import { SectionRow } from "@/layouts/section";
import React, { useContext, useState, useEffect } from "react";
import { useAlerts } from "@/hooks/alertHook";
import { createOrganizationActionHandler } from "@/actionLayer/organization/organizationActions";
import Loader from "../../../../../../components/Modal/LoadingModal";
import { PublicProfileCreateStageContext } from "@/contexts/publicProfileContext/createPublicProfileStageContext";
import { CreatePublicProfileContext } from "@/contexts/publicProfileContext/createPublicProfileContext";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import ImageUploadModal from "../../../../../../components/Modal/imageUpload/ImageUploadModal";
import { ImageUploadDetailsContext } from "@/contexts/imageUploadContext/imageUploadContext";
import { toEllipsis } from "@/helpers/stringCrop";
import { selectionDropDownGetValue } from "@/helpers/selectionDropDownHelper";
import { Checkbox } from "@mui/material";

export interface CreatePublicProfileProps { }

const CreatePublicProfileStep04: React.FC<CreatePublicProfileProps> = (props) => {
  const { setAlert } = useAlerts();
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const [uploadType, setUploadType] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");
  const [metadata, setMetadata] = useState<any>({});
  const [profileImageFileId, setProfileImageFileId] = useState("");
  const [coverImageFileId, setCoverImageFileId] = useState("");
  const [profileImageFileName, setProfileImageFileName] = useState("");
  const [coverImageFileName, setCoverImageFileName] = useState("");
  const [validateAge, setValidateAge] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const { setPublicProfileCreateStageCount } = useContext(PublicProfileCreateStageContext);
  const { publicProfileName, publicProfileInterests,
    aboutPublicProfile, publicProfileNetworks, setPublicProfileImages } = useContext(CreatePublicProfileContext);
  const { uploadImageFileId, uploadImageFileName } = React.useContext(ImageUploadDetailsContext);
  const { setImageUploadModal } = React.useContext(ModalOpenCloseContext);
  const { setPublicProfileName, setPublicProfileInterests,
    setAboutPublicProfile, setPublicProfileNetworks } = useContext(CreatePublicProfileContext);

  useEffect(() => {
    if (uploadType === "ORG_LOGO") {
      setProfileImageFileId(uploadImageFileId);
      setProfileImageFileName(uploadImageFileName);
    } else if (uploadType === "ORG_COVER") {
      setCoverImageFileId(uploadImageFileId);
      setCoverImageFileName(uploadImageFileName);
    }
  }, [uploadImageFileId, uploadImageFileName])

  const crearPPCreateData = () => {
    setPublicProfileName("")
    setPublicProfileInterests([]);
    setAboutPublicProfile({});
    setPublicProfileNetworks([]);
    setPublicProfileImages({});
  }

  const handleNext = () => {
    setLoaderText("Please Wait...");
    setLoaderOpen(true);

    let imageValues = {
      profileImagePath: profileImageFileId,
      coverImagePath: coverImageFileId
    }

    setPublicProfileImages(imageValues);
    console.log('publicProfileNetworks :>> ', publicProfileNetworks);
    console.log('publicProfileName :>> ', publicProfileName);
    console.log('aboutPublicProfile :>> ', aboutPublicProfile);
    console.log('publicProfileImages :>> ', imageValues);

    if (imageValues.profileImagePath === "") {
      setLoaderOpen(false);
      setAlert({
        message: "Upload Public Profile Logo",
        severity: "error",
      });
    } else if (imageValues.coverImagePath === "") {
      setLoaderOpen(false);
      setAlert({
        message: "Upload Public Profile Cover Image",
        severity: "error",
      });
    } else {
      setSubmitClicked(true);

      if (validateAge) {
        for (const element of publicProfileNetworks.networkRequests) {
          element.networkType = selectionDropDownGetValue(element.networkType);
        }

        let values = {
          userId: parseInt(localStorage.getItem("userId")),
          profileName: publicProfileName,
          description: aboutPublicProfile.description,
          profileImagePath: imageValues.profileImagePath,
          coverImagePath: imageValues.coverImagePath,
          profileType: "PUBLIC_PROFILE",
          mobile: aboutPublicProfile.mobile,
          location: aboutPublicProfile.location,
          tagLine: aboutPublicProfile.tagLine,
          networkRequests: publicProfileNetworks.networkRequests,
          countryCode: aboutPublicProfile.countryCode,
          publicProfileRequest: {
            workPlace: aboutPublicProfile.workPlace,
            university: aboutPublicProfile.university,
            highSchool: aboutPublicProfile.highSchool,
            interestList: publicProfileInterests.interests,
          },
        };

        console.log('values :>> ', values);

        createOrganizationActionHandler(values)
          .then((res: any) => {
            if (res?.responseCode === "00") {
              setLoaderOpen(false);
              setPublicProfileCreateStageCount(6);
              setAlert({
                message: "Public Profile Created!",
                severity: "success",
              });
              crearPPCreateData();
            } else if (res?.responseCode === "08") {
              setLoaderOpen(false);
              setAlert({
                message: "Profile Name exists!",
                severity: "error",
              });
            } else {
              setLoaderOpen(false);
              setAlert({
                message: "Error!",
                severity: "error",
              });
            }
            return res;
          })
          .catch((error) => {
            setLoaderOpen(false);
            setAlert({
              message: error,
              severity: "error",
            });
            return error;
          });
      } else {
        setLoaderOpen(false);
      }
    }
  }

  const handleBack = () => {
    setPublicProfileCreateStageCount(4)
  }

  return (
    <React.Fragment>
      <div className="homeRightMainSec2 pb-4">
        <div className="grid justify-items-center ">
          <span className="createOrganizationTxt mt-8">
            Let's get started with a few details<br />about your Public Profile.
          </span>
          <br />
          <br />
          <div className="organizationNameInput relative">
            <SectionRow>
              <span className="uploadOrganizationLogoText mt-2">Upload Public Profile Logo</span>
              <RoundedButton
                ref={undefined}
                onClick={(e: any) => {
                  setMetadata({ uploadType: "ORG_LOGO" });
                  setUploadType("ORG_LOGO");
                  setUploadTitle("Upload Your Logo");
                  setImageUploadModal(true);
                }}
                className='chooseFileBTN mt-1 absolute right-5'>
                {profileImageFileName ? toEllipsis(profileImageFileName, 12) : "Choose File"}
              </RoundedButton>
            </SectionRow>
          </div>
          <span className="createOrganizationTxt04 mt-1">
            JPGs, JPEGs, and PNGs supported.
          </span>

          <div className="organizationNameInput relative mt-4">
            <SectionRow>
              <span className="uploadOrganizationLogoText mt-2">Upload Public Profile Cover Image</span>
              <RoundedButton
                ref={undefined}
                onClick={(e: any) => {
                  setMetadata({ uploadType: "ORG_COVER" });
                  setUploadType("ORG_COVER");
                  setUploadTitle("Upload Cover Photo");
                  setImageUploadModal(true);
                }}
                className='chooseFileBTN mt-1 absolute right-5'>
                {coverImageFileName ? toEllipsis(coverImageFileName, 12) : "Choose File"}
              </RoundedButton>
            </SectionRow>
          </div>
          <span className="createOrganizationTxt04 mt-1">
            JPGs, JPEGs, and PNGs supported.
          </span>
          <div className="flex flex-row items-center w-[550px] mt-8">
            <div>
              <Checkbox
                checked={validateAge}
                onChange={(e) => setValidateAge(e.target.checked)}
                sx={{
                  color: "#2CD1EF",
                  "&.Mui-checked": {
                    color: "#2CD1EF",
                  },
                  marginLeft: "-10px"
                }}
                size="medium"
              />
            </div>
            <div className="mt-2 w-[500px]">
              <span className="createOrganizationTxt05 mt-8">
                I verify that I am an authorized representative of this Public Profile and have the right
                to act on its behalf in the creation and management of this page. The Public Profile
                and I agree to the additional terms for Pages.
              </span>
            </div>
          </div>
          {!validateAge && submitClicked ? (
            <div className="validationError"><p>You need to agree with this condition.</p></div>
          ) : null}

          <SectionRow className="ml-4 mt-8">

            <RoundedButton
              ref={undefined}
              onClick={(e: any) => {
                handleBack()
              }}
              className='BackBTN mr-3'>
              Back
            </RoundedButton>
            <RoundedButton
              ref={undefined}
              onClick={(e: any) => {
                handleNext()
              }}
              className={validateAge ? 'NextBTN' : 'BackBTN'}
            >
              Create
            </RoundedButton>
          </SectionRow>
        </div>
      </div>
      <Loader loaderText={loaderText} open={loaderOpen} />
      <ImageUploadModal metadata={metadata} title={uploadTitle} />
    </React.Fragment>
  );
};

export default CreatePublicProfileStep04;
