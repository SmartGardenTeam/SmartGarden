import { Link } from "react-router-dom";
import classes from "./BreadCrumbs.module.scss";
import fonts from "../../../../assets/styles/FontFamilies.module.scss";

interface BreadCrumbsProps {
  GardenName: string;
  PlantName: string;
}

const BreadCrumbs = ({ GardenName, PlantName }: BreadCrumbsProps) => {
  return (
    <>
      {!GardenName && !PlantName && <p>Data is loading</p>}
      {GardenName && PlantName && (
        <div className="col d-flex justify-content-start card-background rounded-4">
          <ul className="d-flex m-2 ps-0 ms-0 gap-3">
            <Link
              to={"home"}
              className={`${fonts.fredokaBoldTitle} ${classes.custom_hover} p-2 rounded-2`}
            >
              Home
            </Link>
            <h4 className="pt-1">{">"}</h4>
            <Link
              to={""}
              className={`${fonts.fredokaBoldTitle} ${classes.custom_hover} p-2 rounded-2`}
            >
              {GardenName}
            </Link>
            <h4 className="pt-1">{">"}</h4>
            <Link
              to={""}
              className={`${fonts.fredokaBoldTitle} ${classes.custom_hover} p-2 rounded-2`}
            >
              {PlantName}
            </Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default BreadCrumbs;
