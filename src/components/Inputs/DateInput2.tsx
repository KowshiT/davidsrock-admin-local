import React from 'react';
import { ErrorMessage, Field } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';

const DatePickerField2 = ({ name, label, title, minDate, maxDate, ...rest }) => {

  return (
    <Field name={name}>
      {({ field, form }) => (
        <div className="">
          <div className={`${form.touched[name] && form.errors[name] ? 'validationErrorBorderDateTime' : ''}`}>
            <label className="field">
              <div className="DateInput">
                {/* <span className="dateInputText">{title}</span> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    {...rest}
                    label={label}
                    value={field.value || null}
                    minDate={minDate}
                    maxDate={maxDate}
                    onChange={(newValue) => form.setFieldValue(name, newValue)}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                        <input className="datehtmlinput dateInputText" ref={inputRef} {...inputProps} />
                        {InputProps?.endAdornment}
                      </Box>
                    )}
                  />
                </LocalizationProvider>
              </div>
            </label>
          </div>
          <ErrorMessage component='div' name={field.name} className='validationError' />
        </div>
      )}
    </Field>
  );
};

export default DatePickerField2;
