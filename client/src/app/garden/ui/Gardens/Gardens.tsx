import classes from "./Gardens.module.scss";
import fonts from "../../../../assets/styles/FontFamilies.module.scss";
import GardenItem from "../garden-item/GardenItem";
import AddGarden from "../add-garden/AddGarden";
import { useEffect, useRef, useState } from "react";
import { FindGardensByOwnerId } from "../../models/FindGardensByOwnerId";
import GardenService from "../../services/GardenService";
import { Toast } from "primereact/toast";

const Gardens = () => {
  const toast = useRef<Toast>(null);
  const [gardens, setGardens] = useState<FindGardensByOwnerId[]>([]);

  useEffect(() => {
    const FindGardensByOwnerId = async () => {
      const response = await GardenService.findGardensByOwnerId();
      if (response && response.success) {
        setGardens(response.data);
      } else {
        toast.current?.show({
          severity: "error",
          detail: response.errors[0],
          life: 3000,
        });
      }
    };

    FindGardensByOwnerId();
  }, []);

  return (
    <div>
      <div className={`${fonts.montserratBoldTitle} mt-4`}>Gardens</div>
      <div className={`${classes.gardensContainer} p-4`}>
        {gardens.length > 0
          ? gardens.map((garden) => (
              <GardenItem
                key={garden.id}
                id={garden.id}
                name={garden.name}
                metricsResponse={garden.metricsResponse}
              />
            ))
          : ""}
        <AddGarden />
      </div>
      <Toast />
    </div>
  );
};

export default Gardens;
