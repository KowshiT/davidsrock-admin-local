import { components } from "react-select";

export const customStyles = {
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
    width: 400,
    backgroundColor: "white",
    marginLeft: "-40px",
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: 200, // Adjust the maximum height as needed
    overflowY: "auto",
    zIndex: 9999, // Adjust the z-index value as needed
  }),
  valueContainer: (provided: object) => ({
    ...provided,
    padding: "2px 0", // Adjust padding here
  }),
};

const { Option } = components;

export const IconOption = (props) => (
  <Option {...props}>
    <div className="flex flex-row">
      <div className="network-img-container mr-4">
        <img src={props.data.icon} alt={props.data.label} />
      </div>
      {props.data.label}
    </div>
  </Option>
);
