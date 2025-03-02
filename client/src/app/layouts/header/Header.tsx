import { useLocation } from "react-router-dom";
import classes from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { routeTitles } from "../../shared/constants/RouterMappings";

export default function Header() {
  const location = useLocation();
  const iconSize: SizeProp = "sm";

  const title = routeTitles[location.pathname] || "Home";
  return (
    <div className={`${classes.header} header card-background`}>
      <div className="py-3 px-4 fs-5 d-flex flex-row justify-content-between">
        <div>{title}</div>
        <div
          className="d-flex justify-content-center align-items-center rounded-circle"
          style={{ width: "32px", height: "32px", backgroundColor: "#ececec" }}
        >
          <FontAwesomeIcon
            icon={faUser}
            style={{ color: "#575757" }}
            size={iconSize}
          />
        </div>
      </div>
    </div>
  );
}
