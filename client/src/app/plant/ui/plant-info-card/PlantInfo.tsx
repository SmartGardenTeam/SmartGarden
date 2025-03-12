import fonts from "../../../../assets/styles/FontFamilies.module.scss";
import classes from "./PlantInfo.module.scss";

const PlantInfo = ({ plant }) => {
  if (!plant) {
    return <p>Loading plant information...</p>;
  }
  return (
    <>
      <div className="col card-background rounded-4 p-4 pb-1">
        <div className="">
          <h3 className={`${fonts.fredokaBoldTitle} title-color`}>
            {plant.name} information
          </h3>
          <h5 className={`${fonts.fredokaMediumBoldTitle}`}>
            Plant family: {plant.plantFamily}
          </h5>
          <p className={`${fonts.fredokaCardText}`}>
            First harvest takes {plant.firstHarvest} weeks
          </p>
          <p className={`${fonts.fredokaCardText}`}>
            Final harvest takes: {plant.finalHarvest} weeks
          </p>
          <p className={`${fonts.fredokaCardText}`}>
            Harvest method: {plant.harvestMethod}
          </p>
        </div>
      </div>
    </>
  );
};

export default PlantInfo;
