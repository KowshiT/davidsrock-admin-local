import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import Image from "next/image";
import { closeButtonNew, placeholderImage } from "@/assetsLayer";
import { Field, useFormik } from "formik";
import RoundedButton from "../../../../components/Buttons/RoundedButtons";
import { BsPlus } from "react-icons/bs";

export interface AddPublicProfileInterestModalProps {
  interestList: any;
  setListOfInterest: any;
}
const AddPublicProfileInterestModal: React.FC<
  AddPublicProfileInterestModalProps
> = (props) => {
  const { setAddPublicProfileInterestModal, addPublicProfileInterestModal } =
    React.useContext(ModalOpenCloseContext);
  const [emoji, setEmoji] = useState("");

  const initialValues = {
    fields: props.interestList.length > 0 ? [...props.interestList] : [""],
  };

  const handleSubmit = (values) => {
    props.setListOfInterest(values.fields);
    handleCloseMenuBar();
  };

  const handleCloseMenuBar = () => setAddPublicProfileInterestModal(false);

  const formik = useFormik({ initialValues, onSubmit: handleSubmit });

  const addField = () => {
    formik.setFieldValue("fields", [...formik.values.fields, ""]);
  };

  const handleRemoveFields = (index) => {
    const updatedFields = [...formik.values.fields];
    updatedFields.splice(index, 1);
    formik.setFieldValue("fields", updatedFields);
  };

  const handleFieldChange = (index: any, value: any) => {
    const updatedFields = [...formik.values.fields];
    updatedFields[index] = value;
    formik.setFieldValue("fields", updatedFields);
  };
  return (
    <Modal
      open={addPublicProfileInterestModal}
      onClose={handleCloseMenuBar}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="edit-modal-container py-3">
        <button
          onClick={(e: any) => handleCloseMenuBar()}
          className="modalcloseBTN opacity-100 duration-500 hover:rotate-90 hover:scale-110 hover:opacity-100"
        >
          <Image
            src={closeButtonNew}
            alt="Picture of the author"
            width={30}
            height={30}
          />
        </button>

        <form onSubmit={formik.handleSubmit} className="h-full ">
          <div className="edit-detail-modal-sub-container ">
            <div className="edit-modal-content mt-3">
              <div className="">
                <button
                  type="button"
                  onClick={addField}
                  className="outlined-button flex flex-row items-center justify-center"
                >
                  add
                  <BsPlus
                    size={20}
                    style={{ color: "#2cd1ef", marginLeft: "5px" }}
                  />
                </button>
              </div>

              {formik.values.fields.map((field, index) => (
                <div className="mt-4 flex flex-row" key={index}>
                  <input
                    type="text"
                    value={field}
                    placeholder="type here..."
                    onChange={(e: any) => {
                      handleFieldChange(index, e.target.value);
                    }}
                    className="edit-input inputBaseInput"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveFields(index)}
                    className="remove-text ml-4"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="edit-detail-modal-sub-save-wrapper flex w-full justify-center">
            <RoundedButton
              ref={undefined}
              onClick={undefined}
              className="NextBTN m-auto"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Save
            </RoundedButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddPublicProfileInterestModal;
