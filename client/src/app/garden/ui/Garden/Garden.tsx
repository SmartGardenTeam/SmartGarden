import { useParams } from "react-router-dom";
import GardenService from "../../services/GardenService";
import { useRef, useEffect, useState } from "react";
import { GardenModel } from "../../models/GardenModel";
import { Toast } from "primereact/toast";
import GardenInfo from "../garden-info/GardenInfo";
import GardenControl from "../garden-control/GardenControl";
import LightIcon from "../../../../assets/images/LightIcon.svg";
import AerationIcon from "../../../../assets/images/AerationIcon.svg";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import classes from "./Garden.module.scss";
import { InputText } from "primereact/inputtext";
import { PlantModel } from "../../../plant/models/PlantModel";
import PlantService from "../../../plant/services/PlantService";
import PlantInfo from "../../../plant/ui/plant-info-card/PlantInfo";
import BreadCrumbs from "../bread-crumbs/BreadCrumbs";
import MetricsService from "../../../metrics/service/MetricService";
import { FullMetricsResponse } from "../../../metrics/models/FullMetricsResponse";

const Garden = () => {
  const toast = useRef<Toast>(null);
  const params = useParams();
  const [garden, SetGarden] = useState<GardenModel | null>(null);
  const [plant, SetPlant] = useState<PlantModel | null>(null);
  const [metrics, SetMetrics] = useState<FullMetricsResponse[] | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
  });

  useEffect(() => {
    const fetchGarden = async () => {
      if (params.gardenId) {
        const response = await GardenService.findGardenById(params.gardenId);
        const plantResponse = await PlantService.findPlantByGardenId(
          params.gardenId
        );
        const metricResponse = await MetricsService.getAllGardenMetrics(
          params.gardenId
        );

        if (
          response.success &&
          plantResponse.success &&
          metricResponse.success
        ) {
          SetGarden(response.data);
          SetPlant(plantResponse.data);
          SetMetrics(metricResponse.data);
        } else if (!response.success) {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: response.errors[0],
            life: 3000,
          });
        } else if (!metricResponse.success) {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: metricResponse.errors[0],
            life: 3000,
          });
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: plantResponse.errors[0],
            life: 3000,
          });
        }
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "No id for garden",
          life: 3000,
        });
      }
    };

    fetchGarden();
    console.log(metrics);
  }, [params.gardenId]);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    //@ts-ignore
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilter(value);
  };

  return (
    <>
      <div
        className={`${classes.width} ${classes.color} container   p-2 ps-4 pe-4`}
      >
        <div className="row mb-2 p-2">
          {!garden && !plant}
          {garden && plant && (
            <BreadCrumbs GardenName={garden.name} PlantName={plant.name} />
          )}
        </div>
        <div className="row gap-5 mb-4 p-2">
          <GardenInfo name={garden?.name} />
          <PlantInfo plant={plant} />
          <GardenControl
            img={LightIcon}
            title={"Lighting"}
            text={"Plant grow led light"}
            time={"44 min"}
            kwh={"12 kwh"}
          />
          <GardenControl
            img={AerationIcon}
            title={"Aeration"}
            text={"Air stone pump"}
            time={"12 min"}
            kwh={"3 kwh"}
          />
        </div>
        <div className="row gap-5 mb-4 p-2">
          <div className="col card-background rounded-4 p-4">E</div>
          <div className="col card-background rounded-4 p-4">F</div>
        </div>
        <div className="row p-2">
          <div className="col card-background rounded-4 p-4 ">
            <div>
              {/* Global Search Input */}
              <span className="p-input-icon-left  mb-4">
                <i className="pi pi-search ms-4 " />
                <InputText
                  value={globalFilter}
                  onChange={onGlobalFilterChange}
                  placeholder="Global Search"
                  className="ms-1 ps-5"
                />
              </span>{" "}
              <DataTable
                value={metrics ? metrics : undefined}
                removableSort
                tableStyle={{ minWidth: "50rem" }}
                globalFilter={globalFilter}
              >
                <Column
                  field="moisture"
                  header="Moisture"
                  sortable
                  style={{ width: "12.5%" }}
                ></Column>
                <Column
                  field="phofWater"
                  header="WaterPH"
                  sortable
                  style={{ width: "12.5%" }}
                ></Column>
                <Column
                  field="airTemperature"
                  header="AirTemp"
                  sortable
                  style={{ width: "12.5%" }}
                ></Column>
                <Column
                  field="waterTemperature"
                  header="WaterTemp"
                  sortable
                  style={{ width: "12.5%" }}
                ></Column>
                <Column
                  field="timestamp"
                  header="Date/Time"
                  sortable
                  style={{ width: "12.5%" }}
                ></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </>
  );
};

export default Garden;
