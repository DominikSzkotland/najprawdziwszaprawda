import "./App.css";
import Navbar from "./navbar/Navbar.tsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="mainPage">
      <Navbar></Navbar>
      <main className="contentArea">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
