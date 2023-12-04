import React from "react";
import { ErrorMessage, Field } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";

const DateInputCustomize = ({ name, label, maxDate, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <div className="">
          <div
            className={`inputBaseInput edit-date-picker mt-1 ${
              form.touched[name] && form.errors[name]
                ? "validationErrorBorder"
                : ""
            }`}
          >
            <label className="">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  {...rest}
                  label={label}
                  maxDate={maxDate}
                  value={field.value || null}
                  onChange={(newValue) => form.setFieldValue(name, newValue)}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <input
                        className="datehtmlinput dateInputText"
                        ref={inputRef}
                        {...inputProps}
                      />
                      <div className="">{InputProps?.endAdornment}</div>
                    </Box>
                  )}
                />
              </LocalizationProvider>
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

export default DateInputCustomize;
