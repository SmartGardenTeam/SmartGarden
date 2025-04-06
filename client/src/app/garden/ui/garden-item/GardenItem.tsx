import { GardenItemProps } from "../../interfaces/GardenItemProps";
import { GardenItemStatsProps } from "../../interfaces/GardenItemStatsProps";
import classes from "../garden-item/GardenItem.module.scss";
import fonts from "../../../../assets/styles/FontFamilies.module.scss";
import greenSalad from "../../../../assets/images/greenSalad.svg";
import GardenItemStats from "../garden-item-stats/GardenItemStats";
import { Link } from "react-router-dom";
import { MetricsResponse } from "../../../metrics/models/MetricsResponse";

interface GardenItem {
  id: number;
  name: string;
  metricResponse: MetricsResponse;
}

const GardenItem = ({ id, name, metricsResponse }: GardenItemProps) => {
  const gardenItemProps = {
    id,
    name,
    metricsResponse: metricsResponse,
  };

  return gardenItemProps.metricsResponse ? (
    <Link
      to={`/gardens/${gardenItemProps.id}`}
      className={`${classes.gardenItem} card-background rounded-4 sidebar-box-shadow p-3 lh-1 d-flex flex-column position-relative z-2 overflow-hidden text-decoration-none pe-auto`}
    >
      <div className={`${fonts.fredokaLightTitle} title-color`}>{name}</div>
      <div className={`${classes.statsContainer} mt-auto `}>
        <GardenItemStats
          {...({
            type: "moisture",
            value: gardenItemProps.metricsResponse.moisture,
            sign: "%",
          } as GardenItemStatsProps)}
        ></GardenItemStats>
        <GardenItemStats
          {...({
            type: "air temp.",
            value: gardenItemProps.metricsResponse.airTemperature,
            sign: "°C",
          } as GardenItemStatsProps)}
        ></GardenItemStats>
        <GardenItemStats
          {...({
            type: "pH of water",
            value: gardenItemProps.metricsResponse.phofWater,
            sign: "pH",
          } as GardenItemStatsProps)}
        ></GardenItemStats>
      </div>
      <img
        className={`${classes.img} position-absolute bottom-0 end-0 rounded-4`}
        src={greenSalad}
        alt=""
      ></img>
    </Link>
  ) : (
    <p>No data inside gardenItemProps.metricsResponse</p>
  );
};

export default GardenItem;
