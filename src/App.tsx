import "./App.css";
import Navbar from "./navbar/Navbar.tsx";
import { Outlet } from "react-router-dom";

interface Post {
  id: string;
  created_at: string;
  title: string;
  content: string;
  image_url: string | null;
}

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
