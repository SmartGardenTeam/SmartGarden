import { GardenItemProps } from "../../interfaces/GardenItemProps";
import { GardenItemStatsProps } from "../../interfaces/GardenItemStatsProps";
import classes from "../GardenItem/GardenItem.module.scss";
import GardenItemStats from "../GardenItemStats/GardenItemStats";
import fonts from "../../../../assets/styles/FontFamilies.module.scss";
import greenSalad from "../../../../assets/images/greenSalad.svg";

const GardenItem = ({
  id,
  name,
  moisture,
  airTemp,
  pHOfWater,
}: GardenItemProps) => {
  const gardenItemProps = {
    id,
    name,
    moisture,
    airTemp,
    pHOfWater,
  };

  return (
    <div
      className={`${classes.gardenItem} card-background rounded-4 sidebar-box-shadow p-3 lh-1 d-flex flex-column position-relative z-2 overflow-hidden`}
    >
      <div className={`${fonts.fredokaLightTitle}`}>{name}</div>
      <div className={`${classes.statsContainer} mt-auto `}>
        <GardenItemStats
          {...({
            type: "moisture",
            value: gardenItemProps.moisture,
            sign: "%",
          } as GardenItemStatsProps)}
        ></GardenItemStats>
        <GardenItemStats
          {...({
            type: "air temp.",
            value: gardenItemProps.moisture,
            sign: "°C",
          } as GardenItemStatsProps)}
        ></GardenItemStats>
        <GardenItemStats
          {...({
            type: "pH of water",
            value: gardenItemProps.moisture,
            sign: "pH",
          } as GardenItemStatsProps)}
        ></GardenItemStats>
      </div>
      <img
        className={`${classes.img} position-absolute bottom-0 end-0 rounded-4`}
        src={greenSalad}
        alt=""
      ></img>
    </div>
  );
};

export default GardenItem;
