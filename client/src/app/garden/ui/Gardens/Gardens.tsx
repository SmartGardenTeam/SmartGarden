import { GARDENS } from "../../constants/Gardens";
import GardenItem from "../GardenItem/GardenItem";
import classes from "./Garden.module.scss";
import fonts from "../../../../assets/styles/FontFamilies.module.scss";

const Gardens = () => {
  return (
    <>
      <div className={`${fonts.montserratBoldTitle} mt-4`}>Gardens</div>
      <ul className={`${classes.gardensContainer} p-4`}>
        {GARDENS.map((garden) => (
          <GardenItem key={garden.id} {...garden} />
        ))}
      </ul>
    </>
  );
};

export default Gardens;
