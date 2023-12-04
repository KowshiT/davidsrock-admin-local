import { ErrorMessage, Field, FieldHookConfig, useField } from "formik";
import { useEffect, useState } from "react";
import InputBase from "./InputBase";
import { FunctionComponent, InputHTMLAttributes } from "react";
import Image from "next/image";
import { eyeClose, eyeOpen } from "@/assetsLayer";

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
  value?: any;
  maxLength?: number;
  pattern?: string;
  getValue?: Function;
  error?: string;
  disable?: boolean;
  phEnable?: boolean;
  id?: string;
}
const TextField2: FunctionComponent<InputBaseProps> = (props) => {
  const [error, setError] = useState("");
  const [value, setValue] = useState();
  const [field, meta] = useField(props);
  const [passwordType, setPasswordType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

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

  const showPasswordHandler = (e: any) => {
    setShowPassword(!showPassword);

    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
    e.preventDefault();
  };

  return (
    <div className="mt-1">
      {props.type === "password" ? (
        <div>
          <label className="">
            <input
              {...field}
              placeholder={props.placeholder}
              type={passwordType}
              name={props.name}
              id={props.id}
              maxLength={props.maxLength}
              className={`inputBaseInput ${props.className} ${
                meta.touched && meta.error && "validationErrorBorder"
              }`}
            />
          </label>
          <button
            className="!relative right-5 top-0.5 opacity-50"
            onClick={(e) => showPasswordHandler(e)}
          >
            <Image
              src={showPassword === false ? eyeOpen : eyeClose}
              alt="Picture of the author"
              width={18}
              height={18}
            />
          </button>
        </div>
      ) : (
        <label className="field">
          <input
            {...field}
            placeholder={props.placeholder}
            type={props.type}
            name={props.name}
            id={props.id}
            disabled={props.disable ? props.disable : false}
            maxLength={props.maxLength}
            className={`inputBaseInput   ${props.className}  ${
              meta.touched && meta.error && "validationErrorBorder"
            }`}
          />
        </label>
      )}

      <ErrorMessage
        component="div"
        name={field.name}
        className="validationError"
      />
    </div>
  );
};

export default TextField2;
