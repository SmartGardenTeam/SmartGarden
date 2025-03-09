import { InputText } from "primereact/inputtext";
import { FormEvent, useState } from "react";
import PlantFamilyService from "../../../plant/services/PlantFamilyService";
import { PlantFamilytRequest } from "../../../plant/models/PlantFamilyRequest";

const AddGardenForm = () => {
  const [plantFamily, setPlantFamily] = useState<PlantFamilytRequest>({
    name: "",
  });
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await PlantFamilyService.createPlantFamily(plantFamily);
  };

  return (
    <div>
      <div>Dialog works !</div>
      <form onSubmit={handleSubmit}>
        <InputText />
      </form>
    </div>
  );
};

export default AddGardenForm;
