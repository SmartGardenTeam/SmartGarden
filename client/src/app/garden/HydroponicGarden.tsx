import { Link, useParams } from "react-router-dom";

export default function HydroponicGarden() {
  const params = useParams();

  return (
    <>
      <h1>{params.hydroponicGardenId}</h1>
      <Link to=".." relative='path'></Link>
    </>
  );
}
