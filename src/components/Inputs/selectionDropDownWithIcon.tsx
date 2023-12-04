import { ErrorMessage, useField } from "formik";
import { useEffect, useState, FunctionComponent, InputHTMLAttributes } from "react";
import Select, { components } from "react-select";

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
  value?: any;
  maxLength?: number;
  pattern?: string;
  getValue?: any;
  error?: any;
  disable?: boolean;
  options?: any;
  onChange?: any;
  onBlur?: any;
  menuWidth?: any;
  maxHeight?: any;
}

const SelectionDropDownWithIcon: FunctionComponent<InputBaseProps> = ({
  onChange,
  menuWidth,
  maxHeight,
  ...props
}) => {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [field, meta] = useField(props);

  const customStyles = {
    option: (provided: object) => ({
      ...provided,
      padding: 10,
    }),
    control: () => ({
      display: "flex",
      borderWidth: 0,
      justifyContent: "center",
      paddingTop: 5,
    }),
    menu: (base: object) => ({
      ...base,
      width: menuWidth || 240,
      backgroundColor: "white",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: maxHeight || 900, // Adjust the maximum height as needed
      overflowY: "auto",
      zIndex: 9999, // Adjust the z-index value as needed
    }),
    valueContainer: (provided: object) => ({
      ...provided,
      padding: "2px 0", // Adjust padding here
    }),
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

  const handleChange = (event: any) => {
    if (onChange) onChange(event);
  };

  const { Option } = components;
  const IconOption = (props) => (
    <Option {...props}>
      <div className="flex flex-row">
        <img
          src={props.data.icon}
          style={{ width: 36 }}
          alt={props.data.label}
          className="mr-4"
        />
        {props.data.label}
      </div>
    </Option>
  );

  return (
    <div className="pt-2">
      <Select
        {...field}
        className={`inputBaseInput   ${props.className}  ${meta.touched && meta.error && "validationErrorBorder"
          }`}
        name={props.name}
        styles={customStyles}
        options={props.options}
        placeholder={props.placeholder}
        value={props.value || null}
        onChange={handleChange}
        components={{ Option: IconOption }}
      />

      <ErrorMessage
        component="div"
        name={field.name}
        className="validationError"
      />
    </div>
  );
};

export default SelectionDropDownWithIcon;
