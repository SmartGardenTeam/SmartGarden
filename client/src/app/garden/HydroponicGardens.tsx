import { Link } from "react-router-dom";
import { HYDROPONIC_GARDENS } from "./constants/HydroponicGardens";

export default function HydroponicGardens() {
  return (
    <>
      <h1>Hydroponic gardens</h1>
      <ul>
        {HYDROPONIC_GARDENS.map((hp_garden) => (
          <li key={hp_garden.id}>
            <Link to={hp_garden.id} relative="path">
              {hp_garden.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
