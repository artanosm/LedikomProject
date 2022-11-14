import React from "react";
import Select from "react-select";
import classes from "./Brand.module.css";

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
    color: state.isFocused ? "#ee3183" : "darkgrey",
    padding: 6,
  }),
};

const Brand = ({ brand, setBrand }) => {
  return (
    <div className={classes.container}>
      <Select
        styles={customStyles}
        isClearable={true}
        placeholder="Brand"
        defaultValue={brand}
        isSearchable={false}
        onChange={setBrand}
        options={options}
        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            primary: "#ee3183",
          },
        })}
      ></Select>
    </div>
  );
};

export default React.memo(Brand);
