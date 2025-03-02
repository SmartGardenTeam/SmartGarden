import classes from "./Sidebar.module.scss";
import { SidebarItemsList } from "../../shared/constants/SidebarItemsList";
import SidebarItem from "../sidebar-item/SidebarItem";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/images/SmartGardenLogo.svg";
import { useTheme } from "../../shared/context/ThemeContext";
import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [value, setValue] = useState(theme);

  const iconOptions = [
    { icon: faSun, value: "light" },
    { icon: faMoon, value: "dark" },
  ];

  const iconTemplate = (option: { icon: IconProp }) => {
    return <FontAwesomeIcon icon={option.icon}></FontAwesomeIcon>;
  };

  function handleSelect(value: any): void {
    setTheme(theme === "light" ? "dark" : "light");
    setValue(value);
  }

  return (
    <div
      className={`${classes.sidebar} card-background h-100 d-flex flex-column`}
    >
      <NavLink
        to="/home"
        className={`${classes.logoContainer} p-3 d-flex flex-row text-decoration-none`}
      >
        <img src={Logo} />
        <div className={`fw-bold fs-4 ps-2 d-flex pb-1 lh-1 title-color`}>
          Smart Garden
        </div>
      </NavLink>
      <nav className="d-flex flex-column w-100 mt-4">
        <ul className="list-unstyled">
          {SidebarItemsList.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </ul>
      </nav>
      <div className="mt-auto mb-4 mx-auto">
        <SelectButton
          value={value}
          onChange={(e) => handleSelect(e.value)}
          itemTemplate={iconTemplate}
          options={iconOptions}
        />
      </div>
    </div>
  );
}
