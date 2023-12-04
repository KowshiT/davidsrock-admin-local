import { ErrorMessage, Field, FieldHookConfig, useField } from "formik";
import { useEffect, useState } from "react";
import InputBase from "./InputBase";
import { FunctionComponent, InputHTMLAttributes } from "react";
import Image from "next/image";
import { downIcon, eyeClose, eyeOpen, upIcon } from "../../assetsLayer";
import { SectionRow } from "@/layouts/section";

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
  value?: any;
  maxLength?: number;
  max?: number;
  min?: number;
  pattern?: string;
  getValue?: Function;
  error?: string;
  disable?: boolean;
  phEnable?: boolean;
  id?: string;
  placeholderIcon?: any;
  dropDownTrueItems?: any;
  dropDownFalseItems?: any;
}

const TextField: FunctionComponent<InputBaseProps> = (props) => {
  const [error, setError] = useState("");
  const [value, setValue] = useState();
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [dropDown, setDropDown] = useState(false);
  const [calendar, setCalendar] = useState(false);

  const calendarhandler = (e: any) => {
    setCalendar(!calendar);
  };

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

  const dropDownhandler = (e: any) => {
    setDropDown(!dropDown);
  };

  return (
    <div>
      {props.type === "password" ? (
        <div>
          <label className="">
            <input
              {...field}
              placeholder=" "
              type={passwordType}
              name={props.name}
              className={`inputBaseInput field__input ${props.className} ${
                meta.touched && meta.error && "validationErrorBorder"
              }`}
            />
            <span className="field__label-wrap">
              <span className="field__label mt-1.5 pt-0.5 opacity-70">
                &nbsp;{props.placeholder}
              </span>
            </span>
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
      ) : props.type === "dropDown" ? (
        <div>
          <label className="field">
            <input
              {...field}
              placeholder=" "
              type={passwordType}
              name={props.name}
              className={`inputBaseInput field__input ${props.className} ${
                meta.touched && meta.error && "validationErrorBorder"
              }`}
            />
            <span className="field__label-wrap">
              <span className="field__label mt-1.5 pt-0.5 opacity-70">
                &nbsp;{props.placeholder}
              </span>
            </span>
          </label>
          <button
            className="!relative right-5"
            onClick={(e) => dropDownhandler(e)}
          >
            <Image
              src={dropDown === false ? downIcon : upIcon}
              alt="Picture of the author"
              width={20}
              height={16}
            />
          </button>
        </div>
      ) : props.type === "date" ? (
        <div>
          <div className="-mr-0">
            <SectionRow className="h-2">
              <div
                className={`certificationFormTextColor -mb-3 text-xs font-bold`}
              >
                {/* {props.heading} */}
              </div>
            </SectionRow>

            <label className="field">
              <input
                {...field}
                placeholder={props.placeholder}
                type={props.type}
                name={props.name}
                max={props.max}
                min={props.min}
                id={props.id}
                readOnly={props.readOnly}
                className={`inputBaseInput field__input ${props.className} ${
                  meta.touched && meta.error && "validationErrorBorder"
                }`}
              />
            </label>
            <button
              className={
                // props.formType === "certificationForm"
                //       ?
                // "mt-5 !relative cursor-pointer right-8"
                // :
                "!relative right-5 mt-5 cursor-pointer"
              }
              onClick={(e) => calendarhandler(e)}
            ></button>
          </div>
        </div>
      ) : (
        <div>
          <label className="field">
            <input
              {...field}
              placeholder=" "
              type={props.type}
              name={props.name}
              maxLength={props.maxLength}
              max={props.max}
              min={props.min}
              id={props.id}
              className={`inputBaseInput field__input  ${props.className}  ${
                meta.touched && meta.error && "validationErrorBorder"
              }`}
            />
            <span className="field__label-wrap">
              <span className="field__label mt-1.5 pt-0.5 opacity-70 ">
                &nbsp;{props.placeholder}
              </span>
            </span>
          </label>
          {/* {props.placeholderIcon == '' ? false :<button className="mt-6 !relative right-5">
            <Image
              src={props.placeholderIcon}
              alt="Picture of the author"
              width={18}
              height={14}
            />
          </button>} */}
        </div>
      )}
      {/* <input
				{...field}
				placeholder={props.placeholder}
				type={props.type}
				name={props.name}
				className={`inputBaseInput field__input  ${props.className}  ${
					meta.touched && meta.error && "validationErrorBorder"
				}`}
			/> */}
      {props.placeholder === "HS code" ? (
        <ErrorMessage
          component="div"
          name={field.name}
          className="validationError !w-28"
        />
      ) : (
        <ErrorMessage
          component="div"
          name={field.name}
          className="validationError"
        />
      )}
    </div>
  );
};

export default TextField;
