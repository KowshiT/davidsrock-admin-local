import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import EmojiPicker, {
  EmojiStyle,
  EmojiClickData,
  Emoji,
} from "emoji-picker-react";
import Image from "next/image";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import { SectionColumn, SectionRow } from "@/layouts/section";
import { modalCloseIcon, placeholderImage } from "@/assetsLayer";
import {
  getProfileId,
  getUserAccountType,
  getUserIdFromStorage,
} from "@/helpers/authHelper";
import { useUser } from "@/contexts/authContext/userProvider";
import PublicIcon from "@mui/icons-material/Public";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RoundedButton from "../../../components/Buttons/RoundedButtons";
import { AiOutlineClose } from "react-icons/ai";
import ImageUploadModal from "../imageUpload/ImageUploadModal";
import { ImageUploadDetailsContext } from "@/contexts/imageUploadContext/imageUploadContext";
import { createPostActionHandler } from "@/actionLayer/post/postActions";
import { useAlerts } from "@/hooks/alertHook";
import Loader from "../LoadingModal";
import { AccountType } from "@/helpers/enumHelpers";

export interface Props {
}

const CreatePostModal: React.FC<Props> = (props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showPicker, setShowPicker] = useState(false);
  const [feelingClicked, setFeelingClicked] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [selectedFeeling, setSelectedFeeling] = useState("");
  const [loaderOpen, setLoaderOpen] = useState(false);

  const { createPostModal, setCreatePostModal } = React.useContext(
    ModalOpenCloseContext
  );
  const { setImageUploadModal } = React.useContext(ModalOpenCloseContext);
  const { uploadImageFileId, setUploadImageFileId } = React.useContext(
    ImageUploadDetailsContext
  );
  const { userName, profilePicture, profilePicture2, accountType } = useUser();
  const { setAlert } = useAlerts();

  useEffect(() => {
    setUploadImageFileId("");
  }, [])

  const handleCloseMenuBar = () => {
    setUploadImageFileId("");
    setInputValue("");
    setCreatePostModal(false);
    setShowPicker(false);
    setFeelingClicked(false);
    setSelectedFeeling("");
    setSelectedEmoji("");
  };

  const selectEmojiHandler = (emojiData: EmojiClickData, event: MouseEvent) => {
    console.log("emojiData.unified :>> ", emojiData.unified);
    setInputValue(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );
  };

  const onFeelingClicked = (emoji, feeling) => {
    setSelectedEmoji(emoji);
    setSelectedFeeling(feeling);
    setFeelingClicked(false);
  };

  const getLoggedUserId = () => {
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

  const onSubmitHandler = () => {
    setLoaderOpen(true);
    let values = {
      createdByReferenceId: getLoggedUserId(),
      createdByProfileType: getUserAccountType(),
      postPrivacy: "PUBLIC",
      postCategory: "GENERAL",
      title: "",
      description: inputValue,
      imagePathList: [uploadImageFileId],
      feeling: {
        emoji: selectedEmoji,
        emotion: selectedFeeling,
      },
    };

    if (values.imagePathList[0] === "" && values.description === "") {
      setLoaderOpen(false);
      setAlert({
        message: "Add a photo or a description.",
        severity: "error",
      });
    } else {
      createPostActionHandler(values)
        .then((res: any) => {
          if (res?.responseCode === "00") {
            setLoaderOpen(false);
            handleCloseMenuBar();
            setAlert({
              message: "Post created successfully.",
              severity: "success",
            });
            window.location.reload();
          } else {
            setLoaderOpen(false);
            setAlert({
              message: res?.responseMessage || "Error",
              severity: "error",
            });
          }
          return res;
        })
        .catch((error) => {
          setLoaderOpen(false);
          setAlert({
            message: error || "error",
            severity: "error",
          });
          return error;
        });
    }
  };

  return (
    <div>
      <Modal
        open={createPostModal}
        onClose={handleCloseMenuBar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modalShadow"
      >
        <div className="modalStructureCreatePost modalShadow">
          {feelingClicked ? (
            <div>
              <div className="modalContent p-4">
                <SectionColumn>
                  <SectionRow className="MenuHeaderContainer w-full items-center">
                    <button
                      className="mb-4 mr-4 rounded-full bg-slate-300"
                      onClick={(e: any) => setFeelingClicked(false)}
                    >
                      <ArrowBackIcon />
                    </button>
                    <span className="PostTitleText h3-black-13-text pb-4">
                      How are you feeling?
                    </span>
                  </SectionRow>

                  <div className="w-full px-2 pt-4">
                    <SectionRow className="mb-1">
                      <button
                        onClick={() => onFeelingClicked("1f60a", "Happy")}
                        className="w-1/2 rounded-lg px-4 duration-300 hover:bg-slate-300"
                      >
                        <SectionRow className="items-center py-1">
                          <Emoji unified="1f60a" size={45} />
                          <span className="createPostFeelingText ml-4">
                            Happy
                          </span>
                        </SectionRow>
                      </button>
                      <button
                        onClick={() => onFeelingClicked("1f607", "Blessed")}
                        className="w-1/2 rounded-lg px-4 duration-300 hover:bg-slate-300"
                      >
                        <SectionRow className="items-center py-1">
                          <Emoji unified="1f607" size={45} />
                          <span className="createPostFeelingText ml-4">
                            Blessed
                          </span>
                        </SectionRow>
                      </button>
                    </SectionRow>

                    <SectionRow className="mb-1">
                      <button
                        onClick={() => onFeelingClicked("1f970", "Loved")}
                        className="w-1/2 rounded-lg px-4 duration-300 hover:bg-slate-300"
                      >
                        <SectionRow className="items-center py-1">
                          <Emoji unified="1f970" size={45} />
                          <span className="createPostFeelingText ml-4">
                            Loved
                          </span>
                        </SectionRow>
                      </button>
                      <button
                        onClick={() => onFeelingClicked("1f641", "Sad")}
                        className="w-1/2 rounded-lg px-4 duration-300 hover:bg-slate-300"
                      >
                        <SectionRow className="items-center py-1">
                          <Emoji unified="1f641" size={45} />
                          <span className="createPostFeelingText ml-4">
                            Sad
                          </span>
                        </SectionRow>
                      </button>
                    </SectionRow>

                    <SectionRow className="mb-1">
                      <button
                        onClick={() => onFeelingClicked("1f929", "Excited")}
                        className="w-1/2 rounded-lg px-4 duration-300 hover:bg-slate-300"
                      >
                        <SectionRow className="items-center py-1">
                          <Emoji unified="1f929" size={45} />
                          <span className="createPostFeelingText ml-4">
                            Excited
                          </span>
                        </SectionRow>
                      </button>
                      <button
                        onClick={() => onFeelingClicked("1f60d", "Lovely")}
                        className="w-1/2 rounded-lg px-4 duration-300 hover:bg-slate-300"
                      >
                        <SectionRow className="items-center py-1">
                          <Emoji unified="1f60d" size={45} />
                          <span className="createPostFeelingText ml-4">
                            Lovely
                          </span>
                        </SectionRow>
                      </button>
                    </SectionRow>

                    <SectionRow className="mb-1">
                      <button
                        onClick={() => onFeelingClicked("1f92a", "Crazy")}
                        className="w-1/2 rounded-lg px-4 duration-300 hover:bg-slate-300"
                      >
                        <SectionRow className="items-center py-1">
                          <Emoji unified="1f92a" size={45} />
                          <span className="createPostFeelingText ml-4">
                            Crazy
                          </span>
                        </SectionRow>
                      </button>
                      <button
                        onClick={() => onFeelingClicked("1f621", "Angry")}
                        className="w-1/2 rounded-lg px-4 duration-300 hover:bg-slate-300"
                      >
                        <SectionRow className="items-center py-1">
                          <Emoji unified="1f621" size={45} />
                          <span className="createPostFeelingText ml-4">
                            Angry
                          </span>
                        </SectionRow>
                      </button>
                    </SectionRow>

                    <SectionRow className="mb-1">
                      <button
                        onClick={() => onFeelingClicked("1f973", "Festive")}
                        className="w-1/2 rounded-lg px-4 duration-300 hover:bg-slate-300"
                      >
                        <SectionRow className="items-center py-1">
                          <Emoji unified="1f973" size={45} />
                          <span className="createPostFeelingText ml-4">
                            Festive
                          </span>
                        </SectionRow>
                      </button>
                      <button
                        onClick={() => onFeelingClicked("1f912", "Sick")}
                        className="w-1/2 rounded-lg px-4 duration-300 hover:bg-slate-300"
                      >
                        <SectionRow className="items-center py-1">
                          <Emoji unified="1f912" size={45} />
                          <span className="createPostFeelingText ml-4">
                            Sick
                          </span>
                        </SectionRow>
                      </button>
                    </SectionRow>
                  </div>
                </SectionColumn>
              </div>
            </div>
          ) : (
            <div>
              <div className="modalContent p-4">
                <SectionColumn>
                  <SectionRow className="MenuHeaderContainer w-full items-center justify-between">
                    <span className="organizationDetailsOptionText4 h3-black-13-text pb-4">
                      Create a post
                    </span>
                    <button
                      className="right-0 pb-4 duration-500 hover:opacity-100"
                      onClick={(e: any) => handleCloseMenuBar()}
                    >
                      <Image
                        src={modalCloseIcon}
                        alt="Picture of the author"
                        width={20}
                        height={20}
                      />
                    </button>
                  </SectionRow>

                  <div className="w-full px-2 pt-4">
                    <SectionRow className="w-full items-center px-2 pb-4">
                      {accountType == String(AccountType.PARTNERSHIP) ? (
                        <div className="navbarProfileImageWrapper w-[100px] !ml-1">
                          <Image
                            src={profilePicture || placeholderImage}
                            alt="Picture of the author"
                            width={50}
                            height={50}
                            className="baseImage timelineCreatePostProfileImage rounded-full ring ring-white"
                          />
                          <Image
                            src={profilePicture2 || placeholderImage}
                            alt="Second image"
                            width={50} // Adjust width to half of the first image
                            height={50}
                            className="overlayImage timelineCreatePostProfileImage rounded-full ring ring-white"
                          />
                        </div>
                      ) : (
                        <div className="navbarProfileImageWrapper w-[50px]">
                          <Image
                            // loader ={() => LoginPageImage}
                            src={profilePicture || placeholderImage}
                            alt="Picture of the author"
                            width={50}
                            height={50}
                            className="timelineCreatePostProfileImage rounded-full ring ring-white "
                          />
                        </div>
                      )}
                      <SectionColumn className="ml-3 flex-1">
                        {/* <span className="CreatePostTitleText h3-black-12-text pb-1">
                          {userName}
                          {selectedFeeling ? " is feeling " : ""}
                          {selectedEmoji ? (
                            <span className="mx-1">
                              <Emoji unified={selectedEmoji} size={20} />
                            </span>
                          ) : (
                            ""
                          )}
                          {selectedFeeling || ""}
                        </span> */}

                        <span className="CreatePostTitleText h3-black-12-text pb-1">
                          {userName}
                          {selectedFeeling ? " is feeling " : ""}
                          {selectedEmoji
                            ? String?.fromCodePoint(parseInt(selectedEmoji, 16))
                            : ""}{" "}
                          {selectedFeeling?.toLowerCase() || ""}
                        </span>
                        <span className="timelineAddPostText3 w-max rounded-full border-2 pt-1 pb-1">
                          <SectionRow className="items-center">
                            <PublicIcon
                              style={{
                                fontSize: "14px",
                                marginLeft: "5px",
                                marginRight: "3px",
                              }}
                            />
                            {"Public"}
                            <ArrowDropDownIcon
                              style={{
                                fontSize: "15px",
                                marginRight: "3px",
                              }}
                            />
                          </SectionRow>
                        </span>
                      </SectionColumn>
                    </SectionRow>
                  </div>
                  <div className="createPostModalScroll">
                    <div className="relative">
                      <textarea
                        placeholder="What's on your mind?"
                        name="postText"
                        onChange={(e) => {
                          setInputValue(e.target.value);
                          console.log("inputValue", inputValue);
                        }}
                        value={inputValue}
                        maxLength={1000}
                        className="timelinePostTextArea w-100 mt-1 pr-8"
                      />
                      <SentimentSatisfiedAltIcon
                        style={{
                          color: "#ffcc00",
                          fontSize: "32px",
                          position: "absolute",
                          right: "30px",
                          bottom: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowPicker(!showPicker)}
                      />
                    </div>
                    {showPicker && (
                      <div className="emojiPicker">
                        <EmojiPicker
                          onEmojiClick={selectEmojiHandler}
                          autoFocusSearch={false}
                          emojiStyle={EmojiStyle.NATIVE}
                          height={350}
                        />
                      </div>
                    )}
                    {uploadImageFileId && (
                      <div className="relative p-4">
                        <AiOutlineClose
                          size={40}
                          className="absolute right-5 top-5 cursor-pointer rounded-full bg-black/30 p-2 text-white"
                          onClick={() => setUploadImageFileId("")}
                        />
                        <img
                          src={uploadImageFileId || ""}
                          className="rounded-lg"
                          alt="Picture of the author"
                        />
                      </div>
                    )}
                  </div>
                </SectionColumn>
                <div className="-mx-4 -mb-4 bg-slate-100">
                  <SectionRow className="items-center justify-between p-4">
                    <div className="pl-2">
                      <InsertPhotoIcon
                        onClick={() => setImageUploadModal(true)}
                        style={{
                          color: "#3e75f3",
                          fontSize: "32px",
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                      />
                      <EmojiEmotionsIcon
                        onClick={() => setFeelingClicked(true)}
                        style={{
                          color: "#ffcc00",
                          fontSize: "32px",
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                      />
                      {/* <PlayCircleFilledIcon
                        style={{ color: "#ed3e3b", fontSize: "32px" }}
                      /> */}
                    </div>
                    <RoundedButton
                      ref={undefined}
                      onClick={() => onSubmitHandler()}
                      className="NextBTN"
                    >
                      Post
                    </RoundedButton>
                  </SectionRow>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
      <Loader loaderText={""} open={loaderOpen} />
      <ImageUploadModal title="Uplaod Image" />
    </div>
  );
};

export default CreatePostModal;
