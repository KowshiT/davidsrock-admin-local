import React from "react";
import { FunctionComponent, InputHTMLAttributes } from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import { MuiTelInput } from "mui-tel-input";

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  onChange?: any;
  className?: string;
  value?: string;
  defaultCountry?: any;
  onCountryCodeChange?: any;
  height: string;
}

const PhoneNumberInputField: FunctionComponent<InputBaseProps> = (props) => {
  const styles = (theme) => ({
    root: {
      "&$hover": {
        color: "red",
      },
    },
  });

  return (
    <Field name={props.name}>
      {({ field, form }: FieldProps<string>) => (
        <div className="mt-1">
          <label className="field">
            <MuiTelInput
              className={`inputBaseInput ${
                props.className
              } mt-8 focus:outline-none ${
                form.touched[props.name] &&
                form.errors[props.name] &&
                "validationErrorBorder"
              }`}
              placeholder={props.placeholder}
              value={field.value}
              defaultCountry={props.defaultCountry}
              inputProps={{ maxLength: props.maxLength }}
              onChange={(value, info) => {
                form.setFieldValue(props.name, value);
                if (props.onChange) {
                  props.onChange(value);
                }
                if (props.onCountryCodeChange && info.countryCode !== null) {
                  props.onCountryCodeChange(info.countryCode);
                }
              }}
              onBlur={field.onBlur}
              sx={{
                "& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
                  // height: `${props.height}`,
                  // borderRadius: '5px'
                },
              }}
            />
          </label>
          <ErrorMessage
            name={props.name}
            component="div"
            className="validationError"
          />
        </div>
      )}
    </Field>
  );
};

export default PhoneNumberInputField;
