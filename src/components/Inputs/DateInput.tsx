import React from 'react';
import { ErrorMessage, Field } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';

const DatePickerField = ({ name, label, maxDate, ...rest }) => {

  return (
    <Field name={name}>
      {({ field, form }) => (
        <div className="">
          <div className={`mt-1 inputBaseInput organizationNameInputWithPadding ${form.touched[name] && form.errors[name] ? 'validationErrorBorder' : ''}`}>
            <label className="field">

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  {...rest}
                  label={label}
                  maxDate={maxDate}
                  value={field.value || null}
                  onChange={(newValue) => form.setFieldValue(name, newValue)}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <input className="datehtmlinput dateInputText" ref={inputRef} {...inputProps} />
                      <div className="orgDatePickerIconMargin">
                        {InputProps?.endAdornment}
                      </div>
                    </Box>
                  )}
                />
              </LocalizationProvider>
            </label>
          </div>
          <ErrorMessage component='div' name={field.name} className='validationError' />
        </div>
      )}
    </Field>
  );
};

export default DatePickerField;
