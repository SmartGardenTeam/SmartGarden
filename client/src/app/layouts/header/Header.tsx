import { useLocation } from "react-router-dom";
import classes from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { routeTitles } from "../../shared/constants/RouterMappings";
import { useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import JwtService from "../../shared/services/JwtService";
import {
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
} from "../../auth/constants/TokenConstants";
import { useAuth } from "../../auth/context/AuthContext";

export default function Header() {
  const { setAccessToken, setRefreshToken } = useAuth();
  const location = useLocation();
  const iconSize: SizeProp = "sm";
  const op = useRef<Menu | null>(null);
  const title = routeTitles[location.pathname] || "Home";

  const items: MenuItem[] = [
    {
      label: "Profile",
      icon: "pi pi-user",
      url: "/profile",
    },
    {
      label: "Settings",
      icon: "pi pi-cog",
      url: "/settings",
    },
    {
      label: "Log out",
      icon: "pi pi-sign-out",
      command: () => {
        JwtService.removeToken(JWT_REFRESH_TOKEN);
        JwtService.removeToken(JWT_ACCESS_TOKEN);

        setRefreshToken(null);
        setAccessToken(null);
      },
    },
  ];

  return (
    <>
      <div className={`${classes.header} header card-background p-relative`}>
        <div className="py-3 px-4 fs-5 d-flex flex-row justify-content-between">
          <div>{title}</div>
          <div
            className="d-flex justify-content-center align-items-center rounded-circle"
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#ececec",
            }}
          >
            <Menu
              aria-controls="popup_menu_right"
              aria-haspopup
              model={items}
              popup
              ref={op}
              id="popup_menu_right"
              popupAlignment="right"
            />
            <Button
              unstyled={true}
              style={{
                backgroundColor: "transparent",
                border: "none",
                overflow: "auto",
              }}
              className="mr-2"
              onClick={(event) => op.current!.toggle(event)}
              aria-controls="popup_menu_right"
              aria-haspopup
            >
              <FontAwesomeIcon
                onClick={(event) => op.current!.toggle(event)}
                id="profBtn"
                icon={faUser}
                style={{ color: "#575757" }}
                size={iconSize}
              />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
