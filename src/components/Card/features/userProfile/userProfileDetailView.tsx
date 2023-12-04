import {
  share,
  placeholderImage,
  placeholderBackground,
  DR_Logo_04,
} from "@/assetsLayer";
import RoundedButton from "../../../../components/Buttons/RoundedButtons";
import Section, { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { formatInterests, getIdFromUrl } from "@/helpers/stringCrop";
import Loader from "../../../../components/Modal/LoadingModal";
import ShareModal from "../../../../components/Modal/share/ShareModal";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { sinceDateConverter } from "@/helpers/dateHelpers";
import ImagesWrapperCard from "../../timeline/ImagesWrapper";
import ImageModal from "../../../../components/Modal/imageSlider/ImageModal";
import { useAlerts } from "@/hooks/alertHook";
import { getUserDetailsByPublicURLActionHandler } from "@/actionLayer/user/userActions";
import {
  getProfileId,
  getUserAccountType,
  getUserIdFromStorage,
} from "@/helpers/authHelper";
import { getFollowDetailsActionHandler } from "@/actionLayer/follow/followActions";
import OrganizationPhotos from "../organization/components/organizationSwichComponents/photos";
import Followers from "../organization/components/organizationSwichComponents/followers";
import OrganizationVideo from "../organization/components/organizationSwichComponents/videos";
import { RiEdit2Fill } from "react-icons/ri";
import ProfileDetailsEditModal from "../../../../components/Modal/edit/profileDetailsEditModal";
import UserProfileDetailContent from "../../../../components/Modal/edit/userProfile/userProfileDetailContent";
import { AccountType } from "@/helpers/enumHelpers";
import Posts from "../organization/components/organizationSwichComponents/posts";
import { getGalleryImagesActionHandler } from "@/actionLayer/organization/organizationActions";
import { extractProfileImages } from "@/helpers/extractDataHelper";

export interface UserProfileDetailViewProps {}

const UserProfileDetailView: React.FC<UserProfileDetailViewProps> = (props) => {
  const [userProfileDetails, setUserProfileDetails] = useState<any>();
  const [interestList, setInterestList] = useState<any>([]);
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const [url, setUrl] = useState("");
  const [followersDetails, setFollowersDetails] = useState<any>({});
  const [buttonSwichState, setButtonSwichState] = useState("POST");
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [imageList, setImageList] = useState([]);

  const { setAlert } = useAlerts();
  const [isCreator, setIsCreator] = useState(false);

  const { setShareModal, setEditOrganizationModal } = React.useContext(
    ModalOpenCloseContext
  );

  const getLoggedProfileRefernceId = () => {
    if (getUserAccountType() === "INITIAL") {
      return getUserIdFromStorage();
    } else if (
      getUserAccountType() === "ORGANIZATION" ||
      getUserAccountType() === "PUBLIC_PROFILE" ||
      getUserAccountType() === "PARTNERSHIP"
    ) {
      return getProfileId();
    } else {
      return null;
    }
  };

  useEffect(() => {
    setLoaderText("Please Wait...");
    setLoaderOpen(true);

    if (getUserIdFromStorage()) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
    }

    const currentUrl = window.location.href;
    getIdFromUrl(currentUrl);
    setUrl(currentUrl);

    getUserDetailsByPublicURLActionHandler(currentUrl)
      .then((res: any) => {
        setLoaderOpen(false);
        setUserProfileDetails(res);
        setInterestList(formatInterests(res?.interestEntities));

        if (
          res?.userId === getProfileId() &&
          getUserAccountType() === "INITIAL"
        ) {
          setIsCreator(true);
        }

        let values = {
          profileOrPartnershipId: res?.userId,
          profileType: "INITIAL",
        };

        getGalleryImagesActionHandler(values)
          .then((resImage: any) => {
            setImageList(extractProfileImages(resImage.galleryEntityList));
            return resImage;
          })
          .catch((error) => {
            setLoaderOpen(false);
            setAlert({
              message: error,
              severity: "error",
            });
            return error;
          });

        let followersValue = {
          loggedProfileRefernceId: getLoggedProfileRefernceId(),
          loggedProfileType: getUserAccountType(),
          pointedProfileReferenceId: res?.userId,
          pointedProfileType: "INITIAL",
        };

        getFollowDetailsActionHandler(followersValue)
          .then((res: any) => {
            if (res?.responseCode === "00") {
              console.log("followers res :>> ", res);
              setFollowersDetails(res);
            } else {
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

  const messengerHandler = () => {
    console.log("messengerHandler");
  };

  return (
    <React.Fragment>
      <Section className="grid w-full justify-items-center !pt-4">
        <br />
        <div className="coverProfileImagesSec relative">
          <div className="skeleton-animation">
            <Image
              src={userProfileDetails?.coverImagePath || placeholderBackground}
              alt="Picture of the author"
              width={2250}
              height={1390}
              className="organizationDetailsCoverImage"
            />
            {!userProfileDetails?.coverImagePath && (
              <div className="absolute right-0 top-0 z-0">
                <img
                  src={DR_Logo_04.src || ""}
                  alt="Picture of the author"
                  className="h-[350px] rounded-r-lg"
                />
              </div>
            )}
          </div>
          <div className="skeleton-animation absolute bottom-0 left-10 rounded-full">
            <Image
              src={userProfileDetails?.profileImagePath || placeholderImage}
              alt="Picture of the author"
              width={140}
              height={140}
              className="orgDetailViewProfileImage rounded-full ring ring-white"
            />
          </div>
        </div>
        <div className="organizationMainDetailsSec pt-4">
          <SectionRow className="relative">
            <SectionRow>
              <SectionColumn className="detail-wrapper-container">
                <div className="w-60">
                  <span className="orgNameText">
                    {userProfileDetails?.fullName || ""}
                  </span>
                </div>
                <SectionRow className="mt-4  flex">
                  <SectionColumn className="mr-10 grid justify-items-center">
                    <span className="eventPreviewMainText">
                      {userProfileDetails?.postCount || 0}
                    </span>
                    <span className="previewEventSubTextTxt03">Post</span>
                  </SectionColumn>

                  <SectionColumn className="grid justify-items-center">
                    <span className="eventPreviewMainText">
                      {followersDetails?.countResponse?.followingCount || 0}
                    </span>
                    <span className="previewEventSubTextTxt03">Following</span>
                  </SectionColumn>
                </SectionRow>
                <SectionColumn className="mt-6">
                  <span className="organizationDetailsMainText2">
                    Joined on
                  </span>
                  <span className="previewEventSubTextTxt03 mt-1">
                    {userProfileDetails?.createdDate
                      ? sinceDateConverter(
                          userProfileDetails?.createdDate.slice(0, 10)
                        )
                      : ""}
                  </span>
                </SectionColumn>
                {isUserLogged && !isCreator && (
                  <SectionRow className="mt-6">
                    <div className="tooltipX">
                      <RoundedButton
                        ref={undefined}
                        onClick={(e: any) => {
                          messengerHandler();
                        }}
                        // className="loginBTN"
                        className="disableLoginBTN"
                      >
                        Message
                      </RoundedButton>
                      <span className="tooltiptext">
                        This option will be available soon
                      </span>
                    </div>
                  </SectionRow>
                )}
              </SectionColumn>
              {isCreator ? (
                <button
                  className="ml-5 mr-3 mt-2.5 flex h-fit w-[50px] cursor-pointer flex-row"
                  onClick={(e: any) => setEditOrganizationModal(true)}
                >
                  <RiEdit2Fill size={20} className="primary-color" />

                  <span className="dark-gray-14-text-500 bottom-0 ml-1">
                    Edit
                  </span>
                </button>
              ) : (
                <div className="ml-5 mr-3 w-[50px]"></div>
              )}
              <div className="line3PublicPro mr-0"></div>
            </SectionRow>

            <SectionColumn className="ml-8 flex-1">
              <span className="organizationDetailsMainText2">Email</span>
              <span className="previewEventSubTextTxt04 mt-1">
                {userProfileDetails?.email || "N/A"}
              </span>
              <br />
              <span className="organizationDetailsMainText2">
                Contact Number
              </span>
              <span className="previewEventSubTextTxt04">
                {userProfileDetails?.contactNo || "N/A"}
              </span>
              <br />

              <span className="organizationDetailsMainText2">Interests</span>
              <span className="previewEventSubTextTxt04">
                {interestList || ""}
              </span>
              <SectionRow className="absolute bottom-0">
                <button
                  onClick={(e: any) => {
                    setButtonSwichState("POST");
                  }}
                >
                  <div
                    className={
                      buttonSwichState === "POST"
                        ? "organizationDetailsOptionText2A !mb-4 transform transition duration-500"
                        : "organizationDetailsOptionText2 !mb-4 transform transition duration-500"
                    }
                  >
                    Post
                  </div>
                  {buttonSwichState === "POST" ? (
                    <div className="seletcedLine transform transition duration-500"></div>
                  ) : (
                    <div className="seletcedLineHide transform transition duration-500"></div>
                  )}
                </button>
                <button
                  onClick={(e: any) => {
                    setButtonSwichState("FOLLOWING");
                  }}
                  className="ml-12"
                >
                  <div
                    className={
                      buttonSwichState === "FOLLOWING"
                        ? "organizationDetailsOptionText2A !mb-4 transform transition duration-500"
                        : "organizationDetailsOptionText2 !mb-4 transform transition duration-500"
                    }
                  >
                    Following
                  </div>
                  {buttonSwichState === "FOLLOWING" ? (
                    <div className="seletcedLine transform transition duration-500"></div>
                  ) : (
                    <div className="seletcedLineHide transform transition duration-500"></div>
                  )}
                </button>
                <button
                  onClick={(e: any) => {
                    setButtonSwichState("PHOTOS");
                  }}
                  className="ml-12"
                >
                  <div
                    className={
                      buttonSwichState === "PHOTOS"
                        ? "organizationDetailsOptionText2A !mb-4 transform transition duration-500"
                        : "organizationDetailsOptionText2 !mb-4 transform transition duration-500"
                    }
                  >
                    Photos
                  </div>
                  {buttonSwichState === "PHOTOS" ? (
                    <div className="seletcedLine transform transition duration-500"></div>
                  ) : (
                    <div className="seletcedLineHide transform transition duration-500"></div>
                  )}
                </button>

                {/* <button onClick={(e: any) => { setButtonSwichState("VIDEOS") }} className="ml-12"><div className={(buttonSwichState === "VIDEOS") ? ("organizationDetailsOptionText2A transform transition duration-500 !mb-4") : ("organizationDetailsOptionText2 transform transition duration-500 !mb-4")}>Videos</div>{(buttonSwichState === "VIDEOS") ? (<div className="seletcedLine transform transition duration-500"></div>) : (<div className="seletcedLineHide transform transition duration-500"></div>)}</button> */}
              </SectionRow>
            </SectionColumn>

            <div className="flex justify-end pr-10">
              <RoundedButton
                ref={undefined}
                onClick={(e: any) => {
                  setShareModal(true);
                }}
                className="shareBTN items-end"
              >
                <SectionRow className="pl-4">
                  <Image
                    className="pb-1"
                    src={share}
                    alt="Picture of the author"
                    width={20}
                    height={20}
                  />
                  <div className="pl-1">Share</div>
                </SectionRow>
              </RoundedButton>
            </div>
          </SectionRow>
          <br />
        </div>

        <SectionRow className="orgDetailsDownSec mt-6 ">
          <SectionColumn>
            <div className="mt-4">
              <ImagesWrapperCard imageList={imageList} />
            </div>
          </SectionColumn>

          <div className="right-main-div ml-5">
            {buttonSwichState === "POST" && userProfileDetails && (
              <Posts
                referenceId={userProfileDetails?.userId}
                profileType="INITIAL"
                profileName={userProfileDetails?.fullName}
                profileImage1={userProfileDetails?.profileImagePath}
                isUserLogged={isUserLogged}
              />
            )}
            {buttonSwichState === "FOLLOWING" && (
              <Followers
                profileId={userProfileDetails?.userId}
                profileType="INITIAL"
                followType="following"
              />
            )}{" "}
            {buttonSwichState === "PHOTOS" && (
              <OrganizationPhotos
                profileType="INITIAL"
                profileOrPartnershipId={userProfileDetails?.userId}
                isCreator={isCreator}
              />
            )}
            {buttonSwichState === "VIDEOS" && <OrganizationVideo />}
          </div>
        </SectionRow>
      </Section>
      <Loader loaderText={loaderText} open={loaderOpen} />
      <ShareModal url={url} title="Check out this Public Profile!" />
      <ImageModal images={imageList} />
      {userProfileDetails && (
        <ProfileDetailsEditModal
          detailContent={
            <UserProfileDetailContent details={userProfileDetails} />
          }
          type={String(AccountType.INITIAL)}
          details={userProfileDetails}
          profilePicture={
            userProfileDetails?.profileImagePath
              ? userProfileDetails.profileImagePath
              : null
          }
          coverPicture={userProfileDetails?.coverImagePath}
          userId={getUserIdFromStorage()}
        />
      )}
    </React.Fragment>
  );
};

export default UserProfileDetailView;
