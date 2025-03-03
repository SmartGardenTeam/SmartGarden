import { Link, useParams } from "react-router-dom";

const Garden = () => {
  const params = useParams();

  return (
    <>
      <h1>{params.gardenId}</h1>
      <Link to=".." relative="path"></Link>
    </>
  );
};

export default Garden;
