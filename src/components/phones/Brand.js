import React from "react";
import Select from "react-select";
import classes from './Brand.module.css'
const options = [
  { value: "Apple", label: "Apple" },
  { value: "Samsung", label: "Samsung" },
  { value: "Xiaomi", label: "Xiaomi" },
  { value: "Huawei", label: "Huawei" },
  { value: "OnePlus", label: "OnePlus" },
  { value: "Google", label: "Google" },
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


const Brand = ({ brand, setBrand }) => {
  return (
    <div className={classes.container} >
      <Select
        styles={customStyles}
        isClearable={true}
        placeholder="Brand"
        defaultValue={brand}
        onChange={setBrand}
        options={options}
        theme={(theme) => ({
          ...theme,
          borderRadius: 15,
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

export default Brand;








