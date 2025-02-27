import { NavLink } from "react-router-dom";
import classes from "./Sidebar.module.scss";

export default function Sidebar() {
  return (
    <>
      <div className={classes.sidebar}>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? classes.isActive : undefined
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hydroponicGardens"
                className={({ isActive }) =>
                  isActive ? classes.isActive : undefined
                }
              >
                Hydroponic gardens
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
