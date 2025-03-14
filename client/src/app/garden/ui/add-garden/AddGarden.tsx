import classes from "./AddGarden.module.scss";
import addGardenImg1 from "../../../../assets/images/addGardenImg1.svg";
import addGardenImg2 from "../../../../assets/images/addGardenImg2.svg";
import addGardenImg3 from "../../../../assets/images/addGardenImg3.svg";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import fonts from "../../../../assets/styles/FontFamilies.module.scss";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { CreateGardenRequest } from "../../models/CreateGardenRequest";
import GardenService from "../../services/GardenService";
import { Toast } from "primereact/toast";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "primereact/dropdown";
import { PlantFamily } from "../../../plant-family/interfaces/PlantFamily";
import PlantFamilyService from "../../../plant-family/services/PlantFamilyService";
import PlantService from "../../../plant/services/PlantService";
import { FindAllPlantsByPlantFamilyIdResponse } from "../../../plant/interfaces/FindPlantsByPlantFamilyIdResponse";

const AddGarden = () => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [plantFamilies, setPlantFamilies] = useState<PlantFamily[]>([]);
  const [selectedPlantFamily, setSelectedPlantFamily] =
    useState<PlantFamily | null>(null);
  const [plants, setPlants] = useState<PlantFamily[]>([]);
  const [selectedPlant, setSelectedPlant] =
    useState<FindAllPlantsByPlantFamilyIdResponse | null>(null);
  const [garden, setGarden] = useState<CreateGardenRequest>({
    name: "",
    location: "",
    plantId: selectedPlant?.id || -1,
    quantity: 1,
  });
  const size: SizeProp = "2x";
  const sizexs: SizeProp = "1x";
  const toast = useRef<Toast>(null);

  const headerElement = (
    <div className="d-inline-flex align-items-center justify-content-center">
      <FontAwesomeIcon icon={faSeedling} size={sizexs} color="#10b981" />
      <span className={`${fonts.fredokaBoldTitle} white-space-nowrap ps-3`}>
        Add garden
      </span>
    </div>
  );

  useEffect(() => {
    const findAllPlantFamilies = async () => {
      const response = await PlantFamilyService.findAllPlantFamilies();
      if (response && response.success) {
        setPlantFamilies(response.data as PlantFamily[]);
        setSelectedPlantFamily(response.data[0]);
      } else {
        toast.current?.show({
          severity: "error",
          detail: response.errors[0],
          life: 3000,
        });
      }
    };

    findAllPlantFamilies();
  }, []);

  useEffect(() => {
    const findPlantsByPlantFamilyId = async () => {
      if (selectedPlantFamily == null) return;

      const response = await PlantService.findPlantsByPlantFamilyId(
        selectedPlantFamily!.id
      );
      if (response && response.success) {
        setPlants(response.data);
        setSelectedPlant(response.data[0]);
      } else {
        toast.current?.show({
          severity: "error",
          detail: response.errors[0],
          life: 3000,
        });
      }
    };

    findPlantsByPlantFamilyId();
  }, [plantFamilies, selectedPlantFamily]);

  useEffect(() => {
    setGarden((prevGarden) => ({
      ...prevGarden,
      plantId: selectedPlant?.id || -1,
    }));
  }, [selectedPlant]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await GardenService.createGarden(garden);
    if (response && response.success) {
      () => setVisible(false);

      toast.current?.show({
        severity: "success",
        detail: response.data,
        life: 3000,
      });
    } else {
      toast.current?.show({
        severity: "error",
        detail: response.errors,
        life: 3000,
      });
    }
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setGarden({
      ...garden,
      [event.target?.name]: event.target.value,
    });
  }

  return (
    <>
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
          Add garden
        </div>
        <div className="d-flex justify-content-center m-auto">
          <FontAwesomeIcon icon={faPlus} size={size} />
        </div>
      </a>
      <Dialog
        header={headerElement}
        visible={visible}
        style={{ width: "20%" }}
        closeOnEscape={true}
        dismissableMask
        focusOnShow={false}
        className="card-background"
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="d-flex flex-column gap-3"
        >
          <InputText
            type="text"
            name="name"
            className="mt-1"
            placeholder="Name"
            value={garden.name}
            onChange={handleChange}
            required
          />
          <InputText
            type="text"
            name="location"
            placeholder="Location"
            value={garden.location}
            onChange={handleChange}
            required
          />
          <Dropdown
            value={selectedPlantFamily}
            onChange={(e) => setSelectedPlantFamily(e.value)}
            options={plantFamilies}
            optionLabel="name"
            placeholder="Select plant family"
            filter
            className="w-full md:w-14rem"
          />
          <Dropdown
            value={selectedPlant}
            onChange={(e) => setSelectedPlant(e.value)}
            options={plants}
            optionLabel="name"
            placeholder="Select plant"
            filter
            className="w-full md:w-14rem"
          />
          <InputText
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={`${garden.quantity}`}
            onChange={handleChange}
            required
          />
          <div className="d-flex p-jc-end justify-content-end mt-3">
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
      <Toast />
    </>
  );
};

export default AddGarden;
