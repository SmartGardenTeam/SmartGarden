import fonts from "../../../assets/styles/FontFamilies.module.scss";
import Gardens from "../../garden/ui/gardens/Gardens";
import { UserProvider, useUser } from "../../shared/context/UserContext";

export default function Home() {
  const { currentUser, setCurrentUser } = useUser();

  return (
    <div>
      <div className={fonts.montserratBoldTitle}>
        Welcome back, {currentUser?.username}
      </div>
      <Gardens />
    </div>
  );
}
