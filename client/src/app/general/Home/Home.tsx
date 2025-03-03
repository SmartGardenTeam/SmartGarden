import Gardens from "../../garden/ui/Gardens/Gardens";
import fonts from "../../../assets/styles/FontFamilies.module.scss";

export default function Home() {
  const name = "User";

  return (
    <div>
      <div className={fonts.montserratBoldTitle}>Welcome back, {name}</div>
      <Gardens />
    </div>
  );
}
