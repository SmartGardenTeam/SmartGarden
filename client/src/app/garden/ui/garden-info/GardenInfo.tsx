import GreenSalad from "../../../../assets/images/greenSalad.svg";
import fonts from "../../../../assets/styles/FontFamilies.module.scss";
import classes from "./Gardeninfo.module.scss";
interface GardenInfoProps {
  name?: string;
}
const GardenInfo = ({ name }: GardenInfoProps) => {
  return (
    <div className="col position-relative card-background rounded-4 p-3 pb-3">
      <div className="pe-2 pb-4 ">
        <h3 className={`${fonts.fredokaBoldTitle} title-color`}>{name}</h3>
        <h4 className={`${fonts.fredokaMediumBoldTitle}`}>
          Everything looks Good{" "}
        </h4>
        <p className={`${fonts.fredokaCardText}`}>
          Keep up the good <br></br> work!
        </p>
      </div>

      <img
        src={GreenSalad}
        alt=""
        className={`${classes.GardenInfoImg} position-absolute bottom-0 end-0 rounded-4`}
      />
    </div>
  );
};

export default GardenInfo;
