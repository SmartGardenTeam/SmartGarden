import classes from "./PlantAdministration.module.scss";
import addGardenImg1 from "../../../../assets/images/addGardenImg1.svg";
import addGardenImg2 from "../../../../assets/images/addGardenImg2.svg";
import addGardenImg3 from "../../../../assets/images/addGardenImg3.svg";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import fonts from "../../../../assets/styles/FontFamilies.module.scss";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { PlantFamilytRequest } from "../../models/PlantFamilyRequest";
import PlantFamilyService from "../../services/PlantFamilyService";

const PlantAdministration = () => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [plantFamily, setPlantFamily] = useState<PlantFamilytRequest>({
    name: "",
  });
  const size: SizeProp = "2x";

  const submitForm = () => {
    formRef.current?.requestSubmit();
  };

  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button label="Yes" icon="pi pi-check" onClick={submitForm} autoFocus />
    </div>
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await PlantFamilyService.createPlantFamily(plantFamily);
    () => setVisible(false);
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setPlantFamily({
      ...plantFamily,
      [event.target?.name]: event.target.value,
    });
  }

  return (
    <div>
      <a
        href="#"
        onClick={() => setVisible(true)}
        className={`${classes.gardenItem} card-background rounded-4 sidebar-box-shadow p-3 lh-1 d-flex flex-column position-relative z-2 overflow-hidden text-decoration-none tertiary-color`}
      >
        <img
          src={addGardenImg1}
          alt=""
          className={`${classes.img} position-absolute top-0 start-0 rounded-4`}
        />
        <img
          src={addGardenImg2}
          alt=""
          className={`${classes.img} position-absolute bottom-0 rounded-4`}
        />
        <img
          src={addGardenImg3}
          alt=""
          className={`${classes.img} position-absolute bottom-0 end-0 rounded-4`}
        />
        <div
          className={`${fonts.fredokaLightTitle} d-flex justify-content-center fs-5 title-color`}
        >
          Add plant family
        </div>
        <div className="d-flex justify-content-center m-auto">
          <FontAwesomeIcon icon={faPlus} size={size} />
        </div>
      </a>

      <Dialog
        header="Header"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        closeOnEscape={true}
        dismissableMask
        focusOnShow={false}
        className="card-background"
      >
        <div>Dialog works !</div>
        <form onSubmit={handleSubmit} ref={formRef}>
          <InputText
            type="text"
            name="name"
            placeholder="Full Name"
            value={plantFamily.name}
            onChange={handleChange}
            required
          />{" "}
          <div className="p-d-flex p-jc-end p-mt-3">
            <Button
              label="Cancel"
              type="button"
              className="p-button-text p-mr-2"
              onClick={() => setVisible(false)}
            />
            <Button label="Submit" type="submit" />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default PlantAdministration;
