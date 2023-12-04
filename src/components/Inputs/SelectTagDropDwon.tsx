import { ErrorMessage, Field, FieldHookConfig, useField } from "formik";
import { useEffect, useState } from "react";
import InputBase from "./InputBase";
import { FunctionComponent, InputHTMLAttributes } from "react";
import Select from "react-select";
import { stringCrop } from "../../helpers/stringCrop";
import tagOptionModifier from "../../helpers/tagOptionModifier";

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	type: string;
	placeholder?: string;
	className?: string;
	value?: any;
	maxLength?: number;
	pattern?: string;
	getValue?: any;
	error?: string;
	disable?: boolean;
	options?: any;
	onChange?: any;
	onBlur?: any;
}

const customStyles = {
	option: (provided: object) => ({
		// borderBottom: "1px dotted #444",
		...provided,
		padding: 10,
	}),
	control: () => ({
		display: "flex",
		borderWidth: 0,
		justifyContent: "center",
		padding: 2,
		paddingLeft: 0,
	}),
	menu: (base: object) => ({ ...base, width: 240, backgroundColor: "white" }),
};

const SelectionTagDropDown: FunctionComponent<InputBaseProps> = ({ onChange, ...props }) => {
	const [error, setError] = useState("");
	const [value, setValue] = useState("");
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

	const handleChange = (options: any, propOptions: any) => {
		if (onChange) onChange(tagOptionModifier(options, propOptions));
	};
	useEffect(() => {}, [props.defaultValue]);

	return (
		<div className='pt-2'>
			<Select
				{...field}
				className={`inputBaseInput overflow-visible ${props.className}  ${
					meta.touched && meta.error && "validationErrorBorder"
				}`}
				isMulti
				name={props.name}
				styles={customStyles}
				options={props.options}
				placeholder={props.placeholder}
				value={props.value || null}
				onChange={(e) => handleChange(e, props.options)}
			/>
			<ErrorMessage component='div' name={field.name} className='validationError' />
		</div>
	);
};

export default SelectionTagDropDown;
