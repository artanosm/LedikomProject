import React from "react";
import Select from "react-select";
import classes from "./TypeFilter.module.css";
const options = [
  { value: "phone", label: "Phone" },
  { value: "smartwatch", label: "Smartwatch" },
  { value: "tablet", label: "Tablet" },
  { value: "accessories", label: "Accessories" },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    borderBottom: "1px dotted darkgrey",
    color: state.isSelected ? "black" : "darkgrey",
    color: state.isFocused ? "#ee3183" : "darkgrey",

    padding: 8,
  }),
  //   control: () => ({
  //     // none of react-select's styles are passed to <Control />
  //     width: 200,
  //   }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

const TypeFilter = ({ type, setType }) => {
  return (
    <div className={classes.container}>
      <Select
        styles={customStyles}
        isClearable={true}
        placeholder="Type"
        defaultValue={type}
        onChange={setType}
        options={options}
        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            primary25: "#ee3183",
            primary: "#ee3183",
          },
        })}
      />
    </div>
  );
};

export default TypeFilter;
