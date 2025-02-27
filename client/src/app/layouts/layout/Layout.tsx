import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import classes from "./Layout.module.scss";

export default function Layout() {
  return (
    <div className="d-flex flex-col" style={{ height: "100vh", width: "100%" }}>
      <div className="">
        <Sidebar />
      </div>
      <div
        className={`${classes.mainContent} d-flex flex-column px-4 pt-4 overflow-auto`}
      >
        <header className={classes.header}>
          <Header />
        </header>
        <main className={classes.outlet}>
          <Outlet />
        </main>
        <footer className={classes.footer}>
          <Footer />
        </footer>
      </div>
    </div>
  );
}
