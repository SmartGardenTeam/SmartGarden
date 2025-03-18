import React, { useState } from "react";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import fonts from "../../../../assets/styles/FontFamilies.module.scss";

const GardenControl = ({ img, title, text, time, kwh }) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <>
      <div className="col card-background rounded-4  p-3 pb-2">
        <div className="d-flex flex-column align-contet-end   ">
          <div className="d-flex justify-content-between ">
            <InputSwitch
              checked={checked}
              onChange={(e: InputSwitchChangeEvent) => setChecked(e.value)}
            />
            <div>
              <img src={img} alt={img} />
            </div>
          </div>
          <div className="mt-5">
            <h3 className={`${fonts.fredokaBoldTitle} title-color`}>{title}</h3>
          </div>
          <div>
            <p className={`${fonts.fredokaMediumBoldTitle}`}>{text}</p>
          </div>
          <div className="d-flex justify-content-between align-content-end mt-2">
            <p className={`${fonts.fredokaCardText}`}>{kwh}</p>
            <p className={`${fonts.fredokaCardText}`}>{time}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GardenControl;
