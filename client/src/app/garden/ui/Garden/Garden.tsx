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
import { ProductService } from "./service/ProductService";
import { InputText } from "primereact/inputtext";

const Garden = () => {
  const toast = useRef<Toast>(null);
  const params = useParams();
  const [garden, SetGarden] = useState<GardenModel | null>(null);
  const [products, setProducts] = useState([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
  });

  useEffect(() => {
    const fetchGarden = async () => {
      if (params.gardenId) {
        const response = await GardenService.findGardenById(params.gardenId);

        if (response.success) {
          SetGarden(response.data);
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: response.errors[0],
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
    // ProductService.getProductsMini().then(data => setProducts(data));
  }, [params.gardenId]);

  // const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value ||;
  //   let _filters = { ...filters };
  //   _filters["global"].value = value;

  //   setFilters(_filters);
  //   setGlobalFilter(value);
  // };

  return (
    <>
      <div
        className={`${classes.width} ${classes.color} container   p-2 ps-4 pe-4`}
      >
        <div className="row mb-2 p-2">
          <h4>Crumbs</h4>
        </div>
        <div className="row gap-5 mb-4 p-2">
          <GardenInfo name={garden?.name} />
          <GardenInfo name={garden?.name} />
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
                  //onChange={onGlobalFilterChange}
                  placeholder="Global Search"
                  className="ms-1 ps-5"
                />
              </span>{" "}
              <DataTable
                value={products}
                removableSort
                tableStyle={{ minWidth: "50rem" }}
                globalFilter={globalFilter}
              >
                <Column
                  field="ph"
                  header="Ph"
                  sortable
                  style={{ width: "12.5%" }}
                ></Column>
                <Column
                  field="waterTemp"
                  header="WaterTemp"
                  sortable
                  style={{ width: "12.5%" }}
                ></Column>
                <Column
                  field="airTemp"
                  header="AirTemp"
                  sortable
                  style={{ width: "12.5%" }}
                ></Column>
                <Column
                  field="kwh"
                  header="Kwh"
                  sortable
                  style={{ width: "12.5%" }}
                ></Column>
                <Column
                  field="moisture"
                  header="Moisture"
                  sortable
                  style={{ width: "12.5%" }}
                ></Column>
                <Column
                  field="o2"
                  header="O2"
                  sortable
                  style={{ width: "12.5%" }}
                ></Column>
                <Column
                  field="ec"
                  header="EC"
                  sortable
                  style={{ width: "12.5%" }}
                ></Column>
                <Column
                  field="date"
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
