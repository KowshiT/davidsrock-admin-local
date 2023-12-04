import React from "react";
import { ErrorMessage, Field } from "formik";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TimeInputPickerField = ({
  name,
  label,
  title,
  className = "",
  value,
  ...rest
}) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <div className="">
          <div
            className={`${
              form.touched[name] && form.errors[name]
                ? "validationErrorBorderDateTime"
                : ""
            }`}
          >
            <label className="field">
              <div className={className}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    {...field}
                    {...rest}
                    label={label}
                    value={value || null} // Set the value prop to the provided value
                    onChange={(newValue) => {
                      form.setFieldValue(name, newValue);
                    }}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "13px",
                        }}
                      >
                        <input
                          className="datehtmlinput dateInputText-TimePicker mr-3"
                          ref={inputRef}
                          {...inputProps}
                          placeholder="HH:MM"
                        />
                        {InputProps?.endAdornment}
                        <div>
                          <AccessTimeIcon />
                        </div>
                      </Box>
                    )}
                  />
                </LocalizationProvider>
              </div>
            </label>
          </div>
          <ErrorMessage
            component="div"
            name={field.name}
            className="validationError"
          />
        </div>
      )}
    </Field>
  );
};

export default TimeInputPickerField;
