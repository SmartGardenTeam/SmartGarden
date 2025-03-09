import classes from "./Gardens.module.scss";
import fonts from "../../../../assets/styles/FontFamilies.module.scss";
import GardenItem from "../garden-item/GardenItem";
import { GARDENS } from "../../constants/Gardens";
import AddGarden from "../add-garden/AddGarden";

const Gardens = () => {
  return (
    <>
      <div className={`${fonts.montserratBoldTitle} mt-4`}>Gardens</div>
      <div className={`${classes.gardensContainer} p-4`}>
        {GARDENS.map((garden) => (
          <GardenItem key={garden.id} {...garden} />
        ))}
        <AddGarden />
      </div>
    </>
  );
};

export default Gardens;
