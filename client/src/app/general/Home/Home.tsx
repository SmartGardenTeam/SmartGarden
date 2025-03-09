import fonts from "../../../assets/styles/FontFamilies.module.scss";
import Gardens from "../../garden/ui/gardens/Gardens";

export default function Home() {
  const name = "User";

  return (
    <div>
      <div className={fonts.montserratBoldTitle}>Welcome back, {name}</div>
      <Gardens />
    </div>
  );
}
