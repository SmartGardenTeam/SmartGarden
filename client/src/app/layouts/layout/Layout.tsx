import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import classes from "./Layout.module.scss";

export default function Layout() {
  return (
    <div className="d-flex flex-col vh-100 vw-100">
      <div className="z-2 sidebar-box-shadow">
        <Sidebar />
      </div>
      <div
        className={`${classes.mainContent} d-flex flex-column overflow-auto`}
      >
        <header className={classes.header}>
          <Header />
        </header>
        <main className={`${classes.outlet} px-4 pt-4`}>
          <Outlet />
        </main>
        <footer className={classes.footer}>
          <Footer />
        </footer>
      </div>
    </div>
  );
}
