import React from "react";
import Select from "react-select";
import classes from "./TypeFilter.module.css";
const options = [
  { value: "Phone", label: "Phone" },
  { value: "Smartwatch", label: "Smartwatch" },
  { value: "Tablet", label: "Tablet" },
  { value: "Accessories", label: "Accessories" },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    // borderBottom: "1px dotted darkgrey",
    // color: state.isSelected ? "darkgrey" : "darkgrey",
    color: state.isFocused ? "#ee3183" : "darkgrey",

    padding: 6,
  }),

  // singleValue: (provided, state) => {
  //   const opacity = state.isDisabled ? 0.5 : 1;
  //   const transition = "opacity 300ms";
    
  //   return { ...provided, opacity, transition };
  // },
};

const TypeFilter = ({ type, setType }) => {
  return (
    <div className={classes.container}>
      <Select
        styles={customStyles}
        isClearable={true}
        isSearchable={false}
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

export default React.memo(TypeFilter);
