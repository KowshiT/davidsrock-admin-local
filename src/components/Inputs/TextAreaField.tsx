import { ErrorMessage, useField } from "formik";
import { useEffect, useState } from "react";
import { FunctionComponent, InputHTMLAttributes } from "react";

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  className?: string;
  value?: any;
  maxLength?: number;
  pattern?: string;
  getValue?: Function;
  error?: string;
  disable?: boolean;
  phEnable?: boolean;
}
const TextAreaField: FunctionComponent<InputBaseProps> = (props) => {
  const [error, setError] = useState("");
  const [value, setValue] = useState();
  const [field, meta] = useField(props);

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }

    if (props.getValue) props.getValue(value);
  }, [props, value]);

  useEffect(() => {
    setError("");
  }, [value]);

  useEffect(() => {
    setError(props.error ? props.error : "");
  }, [props]);

  return (
    <div className="mt-2">
      <label className="field">
        <textarea
          {...field}
          placeholder={props.placeholder}
          name={props.name}
          maxLength={props.maxLength}
          className={`inputBaseInput ${props.className} ${meta.touched && meta.error && "validationErrorBorder"
            }`}
        />
      </label>

      <ErrorMessage component='div' name={field.name} className='validationError' />
    </div>
  );
};

export default TextAreaField;
