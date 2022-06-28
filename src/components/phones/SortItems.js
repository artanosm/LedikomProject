import React from "react";
import Select from "react-select";
import classes from "./TypeFilter.module.css";
const options = [
  { value: "ascending", label: "Ascending" },
  { value: "descending", label: "Descending" },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    borderBottom: "1px dotted darkgrey",
    color: state.isSelected ? "black" : "darkgrey",
    color: state.isFocused ? "#ff51ff" : "darkgrey",

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

const SortItems = ({ sort, setSort }) => {
  return (
    <div className={classes.container}>
      <Select
        styles={customStyles}
        isClearable={true}
        placeholder="Price"
        defaultValue={sort}
        onChange={setSort}
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

export default SortItems;