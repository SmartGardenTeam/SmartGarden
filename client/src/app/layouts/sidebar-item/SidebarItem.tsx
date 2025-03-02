import { NavLink } from "react-router-dom";
import SidebarItemProps from "../../shared/interfaces/SidebarItemProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import classes from "./SidebarItem.module.scss";
import fonts from "../../../assets/styles/FontFamilies.module.scss";

const SidebarItem = ({ icon, label, link, subList }: SidebarItemProps) => {
  const iconSize: SizeProp = "sm";

  return (
    <li className={`${classes.listItem} mx-2 list-item`}>
      <NavLink
        to={link}
        className={({ isActive }) =>
          `text-decoration-none title-color w-100 d-flex ps-3 flex-row align-items-center ${
            isActive ? "active-route" : ""
          } ${fonts.fredokaBoldTitle}`
        }
      >
        <FontAwesomeIcon
          icon={Icons[icon as keyof typeof Icons] as IconDefinition}
          className="title-color"
          size={iconSize}
        />
        <div className="d-inline-block w-100 ps-3 lh-sm">
          <span className="align-middle title-color">{label}</span>
        </div>
      </NavLink>
      {subList && subList.length > 0 && (
        <ul>
          {subList.map((subItem) => (
            <SidebarItem key={subItem.label} {...subItem} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
