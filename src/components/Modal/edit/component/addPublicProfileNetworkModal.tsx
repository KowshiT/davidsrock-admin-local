import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { ModalOpenCloseContext } from "@/contexts/modalContext/modalOpenCloseContext";
import Image from "next/image";
import { closeButtonNew, placeholderImage, websiteIcon } from "@/assetsLayer";
import { Field, useFormik } from "formik";
import RoundedButton from "../../../Buttons/RoundedButtons";
import { BsPlus } from "react-icons/bs";
import Select, { components, OptionProps } from "react-select";

import { customStyles, IconOption } from "@/helpers/customStyle";
import { networkListWithIcon } from "@/helpers/selectionDropDownHelper";
import { capitalizedFormat } from "@/helpers/stringCrop";
import { handleSwitchNetworkIcons } from "@/helpers/enumChangeHelpers";

export interface AddPublicProfileNetworkModalProps {
  networkList: any; // Pass your network list here
  setNetworkList: any; // Function to update network list
}

const AddPublicProfileNetworkModal: React.FC<
  AddPublicProfileNetworkModalProps
> = (props) => {
  const { addPublicProfileNetworkModal, setAddPublicProfileNetworkModal } =
    React.useContext(ModalOpenCloseContext);

  const initialValues = {
    fields:
      props.networkList.length > 0
        ? [...props.networkList]
        : [{ networkType: "", link: "" }],
  };

  const handleSubmit = (values) => {
    props.setNetworkList(values.fields);
    handleCloseMenuBar();
  };

  const handleCloseMenuBar = () => setAddPublicProfileNetworkModal(false);

  const formik = useFormik({ initialValues, onSubmit: handleSubmit });

  const addField = () => {
    formik.setFieldValue("fields", [
      ...formik.values.fields,
      { networkType: "", link: "" },
    ]);
  };

  const handleRemoveFields = (index) => {
    const updatedFields = [...formik.values.fields];
    updatedFields.splice(index, 1);
    formik.setFieldValue("fields", updatedFields);
  };

  const handleFieldChange = (index: any, fieldName: string, value: any) => {
    const updatedFields = [...formik.values.fields];
    updatedFields[index][fieldName] = value;
    formik.setFieldValue("fields", updatedFields);
  };

  return (
    <Modal
      open={addPublicProfileNetworkModal}
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
              {formik.values.fields.length < 4 && (
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
              )}

              {formik.values.fields.map((field, index) => (
                <div className="mt-6 flex flex-col" key={index}>
                  <div className="edit-dropdown-container flex flex-row">
                    <div className="network-img-container my-auto mr-4">
                      <img
                        src={handleSwitchNetworkIcons(field.networkType)}
                        alt="picture"
                      />
                    </div>
                    <Select
                      className="inputBaseInput edit-dropdown-without-border"
                      styles={customStyles}
                      options={networkListWithIcon}
                      placeholder="Select Network Type"
                      value={
                        field.networkType !== ""
                          ? {
                              label: capitalizedFormat(field.networkType),
                              value: field.networkType,
                            }
                          : null
                      }
                      onChange={(selectedOption) => {
                        handleFieldChange(
                          index,
                          "networkType",
                          selectedOption.value
                        );
                      }}
                      components={{ Option: IconOption }}
                    />
                  </div>

                  <div className="mt-3 flex flex-row">
                    <input
                      type="text"
                      value={field.link}
                      placeholder="Enter Link"
                      onChange={(e: any) => {
                        handleFieldChange(index, "link", e.target.value);
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

export default AddPublicProfileNetworkModal;
