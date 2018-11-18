import { Icon } from "@modules/reactive-pixels-ui/components/Icon";
import colours from "@modules/reactive-pixels-ui/theme/baseTheme/colours";
import { css } from "emotion";
import * as React from "react";
import Select, { components } from "react-select";
import { IndicatorProps } from "react-select/lib/components/indicators";
import { MenuProps } from "react-select/lib/components/Menu";

const customSelectStyles = {
  container: () => ({
    alignItems: "center",
    borderLeft: `1px solid #E6E6E6`,
    borderRadius: 0,
    borderRight: `1px solid #E6E6E6`,
    cursor: "pointer",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    outline: 0,
    position: "relative" as "relative",
    transition: "background 0.25s",
    ["&:focus, &:hover"]: {
      background: "#F7F7F7"
    },
    [`&:active`]: {
      boxShadow: `inset 0px 0px 4px 0px #E6E6E6`
    }
  }),
  control: () => ({
    alignItems: "center",
    border: 0,
    display: "flex",
    height: "100%"
  }),
  dropdownIndicator: () => ({
    height: 16,
    textAlign: "center" as "center",
    width: 38
  }),
  input: () => ({}),
  menu: (base: any) => ({
    ...base,
    left: "auto",
    right: 4,
    width: 300
  }),
  option: (base: any) => ({
    ...base,
    alignItems: "center",
    backgroundColor: "none",
    color: colours.textColourDark,
    display: "flex",
    ["> svg"]: {
      marginRight: 10
    }
  }),
  valueContainer: () => ({
    height: 0,
    overflow: "hidden",
    textIndent: -99999999,
    width: 0
  })
} as any;

const DropdownIndicator = (props: IndicatorProps<any>) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <Icon.ChevronDown />
      </components.DropdownIndicator>
    )
  );
};

const Menu = (props: MenuProps<any>) => {
  return components.Menu && <components.Menu {...props} />;
};

const Option = (props: any) => {
  const styles = css({
    backgroundColor: props.isFocused ? colours.palette.grey6.hex : "none"
  });

  return (
    components.Option && (
      <components.Option {...props} className={styles}>
        <Icon.Logout />
        {props.data.label}
      </components.Option>
    )
  );
};

export default ({ options, onSelect }: any) => (
  <Select
    components={{
      ClearIndicator: null,
      DropdownIndicator,
      IndicatorSeparator: null,
      Menu,
      Option
    }}
    onChange={onSelect}
    placeholder=""
    options={options}
    isSearchable={false}
    styles={customSelectStyles}
  />
);
