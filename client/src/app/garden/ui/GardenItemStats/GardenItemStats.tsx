import { GardenItemStatsProps } from "../../interfaces/GardenItemStatsProps";
import phOfWaterImg from "../../../../assets/images/pHOfWater.svg";
import moistureImg from "../../../../assets/images/moisture.svg";
import airTempImg from "../../../../assets/images/airTemp.svg";
import fonts from "../../../../assets/styles/FontFamilies.module.scss";
import classes from "./GardenItemStats.module.scss";

const GardenItemStats = ({ type, value, sign }: GardenItemStatsProps) => {
  const images: Record<string, string> = {
    moisture: moistureImg,
    "pH of water": phOfWaterImg,
    "air temp.": airTempImg,
  };

  return (
    <div className="stats-card-background p-3 rounded-3 d-flex flex-row align-items-center me-2 z-3">
      <img src={images[type] || airTempImg} alt={type} width={40} height={40} />
      <div className={`${classes.itemStats} d-flex flex-column ms-2`}>
        <div className={`${fonts.poppinsRegular} gray-text-color`}>{type}</div>
        <div className={`${fonts.fredokaStatsText} mt-auto`}>
          {value}
          {sign}
        </div>
      </div>
    </div>
  );
};

export default GardenItemStats;
