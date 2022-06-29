import React from "react";
import Select from "react-select";
import classes from "./ItemsToDisplay.module.css";
const options = [
  { value: 24, label: "24" },
  { value: 48, label: "48" },
  { value: 96, label: "96" },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    borderBottom: "1px dotted darkgrey",
    color: state.isSelected ? "darkgrey" : "darkgrey",
    color: state.isFocused ? "#ff51ff" : "darkgrey",

    padding: 8,
  }),
  // control: () => ({
  //   // none of react-select's styles are passed to <Control />
  //   width: 150,
  // }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

const ItemsToDisplay = ({ numberOfItems, setNumberOfItems }) => {
  return (
    <div className={classes.container}>
      <Select
        styles={customStyles}
        isClearable={false}
        placeholder="24"
        defaultValue={numberOfItems}
        onChange={setNumberOfItems}
        options={options}
        theme={(theme) => ({
          ...theme,
          borderRadius: 15,
          colors: {
            ...theme.colors,
            primary25: "#ff51ff",
            primary: "#ff51ff",
          },
        })}
      />
    </div>
  );
};

export default ItemsToDisplay;
